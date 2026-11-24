import type { ChatMessage, ChatResponse, DashboardPromptRequest, Widget } from '../shared/contracts.js';
import { config } from './config.js';
import { detectDashboardIntent, findSavingsPlanContinuation, systemPrompt } from './conversation.js';
import { modelChat, type ModelMessage, type ModelTool, type ModelToolCall } from './llm.js';
import { executeAgentTool, getModelTools, isAgentTool } from './tools.js';

const MAX_TOOL_ROUNDS = 3;
const HISTORY_WINDOW = 12;

type ToolOutcome = { name: string; content: string; toolCallId: string; widget?: Widget };
type ArgOverride = (name: string, args: Record<string, unknown>) => Record<string, unknown>;

type RequestPlan = {
  conversation: ModelMessage[];
  modelSystem: string;
  restrictedTools?: Set<string>;
  blocked: Set<string>;
  requiredTool: string | null;
  override: ArgOverride;
};

const keepArgs: ArgOverride = (_name, args) => args;

function parseArguments(raw: unknown): Record<string, unknown> {
  const value = typeof raw === 'string' ? JSON.parse(raw) : (raw ?? {});
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Tool arguments must be a JSON object.');
  return value as Record<string, unknown>;
}

/** Runs one model tool call. Failures are reported back to the model instead of aborting the request. */
async function runToolCall(call: ModelToolCall, plan: RequestPlan): Promise<ToolOutcome> {
  const name = call.function?.name ?? '';
  const toolCallId = call.id ?? name;
  try {
    if (!name || !isAgentTool(name)) throw new Error(`Unknown tool: ${name || '(missing name)'}`);
    if (plan.blocked.has(name)) throw new Error(`Tool ${name} is not available for this request.`);
    const args = plan.override(name, parseArguments(call.function?.arguments));
    const widget = await executeAgentTool(name, args);
    return { name, content: JSON.stringify(widget), toolCallId, widget };
  } catch (error) {
    return { name: name || 'unknown', content: JSON.stringify({ error: error instanceof Error ? error.message : 'Tool call failed.' }), toolCallId };
  }
}

/** Decides which tools, prompt and argument overrides apply to this request. */
function planRequest(messages: ChatMessage[], dashboardPrompt?: DashboardPromptRequest): RequestPlan {
  const latestText = [...messages].reverse().find(message => message.role === 'user')?.content ?? '';
  const recent = messages.slice(-(HISTORY_WINDOW - 1));

  if (dashboardPrompt) {
    const instruction = `Create or revise this banking briefing using the user's additional prompt: "${dashboardPrompt.prompt}". Current briefing type: ${dashboardPrompt.scenario}. Current numeric assumptions: ${JSON.stringify(dashboardPrompt.inputs)}. Interpret the request, call only the relevant MCP tool or tools, and do not call banking_dashboard. Use current numeric assumptions when a selected tool needs them. Keep the briefing limited to the requested information.`;
    return {
      conversation: [{ role: 'user', content: instruction }],
      modelSystem: `${systemPrompt} You are composing a focused dashboard update. You MUST use the supplied MCP tool definitions to choose and call every tool needed to answer the user's additional prompt. Call only relevant tools and never call unrelated ones.`,
      blocked: new Set(['banking_dashboard']),
      requiredTool: null,
      override: keepArgs,
    };
  }

  const dashboardScenario = detectDashboardIntent(latestText);
  if (dashboardScenario) {
    return {
      conversation: [...recent, { role: 'user', content: `Create the ${dashboardScenario} dashboard. Call banking_dashboard with this scenario: ${dashboardScenario}.` }],
      modelSystem: `${systemPrompt} The latest request is for a complete review. You MUST call banking_dashboard with scenario ${dashboardScenario}.`,
      restrictedTools: new Set(['banking_dashboard']),
      blocked: new Set(),
      requiredTool: 'banking dashboard',
      override: (name, args) => name === 'banking_dashboard'
        ? { scenario: dashboardScenario, inputs: args.inputs ?? {}, prompt: latestText }
        : args,
    };
  }

  const savingsPlan = findSavingsPlanContinuation(messages, latestText);
  if (savingsPlan) {
    return {
      conversation: [...recent, { role: 'user', content: `Call savings_goal_planner with exactly these supplied values: ${JSON.stringify(savingsPlan)}.` }],
      modelSystem: `${systemPrompt} The user supplied the missing savings goal values. You MUST call savings_goal_planner with exactly those values.`,
      restrictedTools: new Set(['savings_goal_planner']),
      blocked: new Set(),
      requiredTool: 'savings planner',
      override: (name, args) => name === 'savings_goal_planner' ? savingsPlan : args,
    };
  }

  return { conversation: messages.slice(-HISTORY_WINDOW), modelSystem: systemPrompt, blocked: new Set(), requiredTool: null, override: keepArgs };
}

/** Runs tool rounds until the model stops asking for tools or the round limit is reached. */
async function runToolRounds(history: ModelMessage[], tools: ModelTool[], plan: RequestPlan): Promise<{ message: ModelMessage; widgets: Widget[] }> {
  const collected: Widget[] = [];
  let message = await modelChat(history, tools);
  history.push(message);

  // Rounds are sequential by design: each model reply depends on the previous tool results.
  for (let round = 0; round < MAX_TOOL_ROUNDS && message.tool_calls?.length; round++) {
    const outcomes = await Promise.all(message.tool_calls.map(call => runToolCall(call, plan)));
    for (const outcome of outcomes) {
      if (outcome.widget) collected.push(outcome.widget);
      history.push({ role: 'tool', content: outcome.content, name: outcome.name, tool_call_id: outcome.toolCallId });
    }
    message = await modelChat(history, tools);
    history.push(message);
  }

  // Tool-call limit reached: drop the unresolved request and ask for a plain answer from the results so far.
  if (message.tool_calls?.length) {
    history.pop();
    history.push({ role: 'system', content: 'The tool-call limit was reached. Answer briefly using only the tool results above.' });
    message = await modelChat(history);
  }
  return { message, widgets: collected };
}

function buildBriefing(collected: Widget[], request: DashboardPromptRequest): Widget {
  const unique = [...new Map(collected.map(result => [result.widget, result])).values()];
  return {
    widget: 'dashboard',
    scenario: request.scenario,
    title: 'Customized banking briefing',
    prompt: request.prompt,
    inputs: request.inputs,
    widgets: unique,
  };
}

export async function runBankingChat(messages: ChatMessage[], dashboardPrompt?: DashboardPromptRequest): Promise<ChatResponse> {
  const plan = planRequest(messages, dashboardPrompt);
  const tools = (await getModelTools(plan.restrictedTools)).filter(tool => !plan.blocked.has(tool.function.name));
  const history: ModelMessage[] = [{ role: 'system', content: plan.modelSystem }, ...plan.conversation];
  const { message, widgets: collected } = await runToolRounds(history, tools, plan);

  if (plan.requiredTool && !collected.length) throw new Error(`The model did not call the ${plan.requiredTool} tool. Please retry.`);
  if (dashboardPrompt && !collected.length) throw new Error('The model did not select any MCP tools for this prompt. Please make the requested banking information more specific.');

  const widgets = dashboardPrompt ? [buildBriefing(collected, dashboardPrompt)] : collected;
  const fallback = widgets.length
    ? 'Here is the requested information from the synthetic banking data.'
    : 'I can help with balances, transactions, cards, spending, deposits, loan estimates, KYC, disputes, and financial reviews.';
  return { answer: message.content || fallback, widget: widgets.at(-1) ?? null, widgets, model: config.model, toolInvoked: collected.length > 0 };
}
