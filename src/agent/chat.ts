import type { ChatMessage, ChatResponse, ChatStreamEvent, DashboardPromptRequest, EmployeeProfile, Widget } from '../shared/contracts.js';
import { config } from './config.js';
import { detectDashboardIntent, isSavingsPlanContinuation, systemPrompt } from './conversation.js';
import { modelChat, streamModelChat, type ModelMessage, type ModelTool, type ModelToolCall } from './llm.js';
import { summarizeWidgetsForUser, toModelMessages } from './summarize.js';
import { executeAgentTool, getModelTools, isAgentTool } from './tools.js';

const MAX_TOOL_ROUNDS = 3;
const HISTORY_WINDOW = 12;
const ANALYTICAL_QUERY = /\b(why|insight|insights|trend|anomal|opportunit|cross[- ]?sell|churn|risk|underwrit|segment|pattern|compare|comparison|better|should|can .+ afford|afford|recommend|advice|which|how many|how much|who|what is|what are|explain|analy[sz]e|difference|more than|less than|enough|key takeaway|action|flag|penetration|adoption|whitespace|region|city|cities|liquidity|matur|retention|engagement|branch|branches|ifsc|manager|accounts)\b/i;
const CHAINED_QUERY = /\b(half of|percent of|from my|using my|based on my|and then|using that|from that)\b/i;
const FACTUAL_QUESTION = /^\s*(which|who|how many|how much|what is|what are|does|is there|count)\b/i;
const VISUAL_REQUEST = /\b(show|list|display|pull|view|give me|table|chart|breakdown|overview|profile|360|audit|briefing|newsletter|dashboard|simulate|calculate|forecast|compare|plan|what if)\b/i;

function wantsVisualWidget(plan: RequestPlan, dashboardPrompt?: DashboardPromptRequest): boolean {
  if (dashboardPrompt || plan.requiredTool) return true;
  if (FACTUAL_QUESTION.test(plan.latestText) && !VISUAL_REQUEST.test(plan.latestText)) {
    return false;
  }
  return true;
}

type ToolOutcome = { name: string; content: string; toolCallId: string; widget?: Widget; error?: boolean };
type ArgOverride = (name: string, args: Record<string, unknown>) => Record<string, unknown>;

type RequestPlan = {
  conversation: ModelMessage[];
  modelSystem: string;
  latestText: string;
  restrictedTools?: Set<string>;
  blocked: Set<string>;
  requiredTool: string | null;
  override: ArgOverride;
};

const keepArgs: ArgOverride = (_name, args) => args;

function parseArguments(raw: unknown): Record<string, unknown> {
  if (typeof raw === 'string') {
    const cleaned = raw.trim().replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, '$1').trim();
    const value = cleaned ? JSON.parse(cleaned) : {};
    if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Tool arguments must be a JSON object.');
    return value as Record<string, unknown>;
  }
  const value = raw ?? {};
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Tool arguments must be a JSON object.');
  return value as Record<string, unknown>;
}

/** Runs one model tool call. Failures are reported back to the model instead of aborting the request. */
async function runToolCall(call: ModelToolCall, plan: RequestPlan, actor?: EmployeeProfile): Promise<ToolOutcome> {
  const name = call.function?.name ?? '';
  const toolCallId = call.id ?? name;
  try {
    if (!name || !isAgentTool(name)) throw new Error(`Unknown tool: ${name || '(missing name)'}`);
    if (plan.blocked.has(name)) throw new Error(`Tool ${name} is not available for this request.`);
    const args = plan.override(name, parseArguments(call.function?.arguments));
    const widget = await executeAgentTool(name, args, actor);
    return { name, content: JSON.stringify(widget), toolCallId, widget };
  } catch (error) {
    return { name: name || 'unknown', content: JSON.stringify({ error: error instanceof Error ? error.message : 'Tool call failed.' }), toolCallId, error: true };
  }
}

function actorContextNote(actor?: EmployeeProfile): string {
  if (!actor) return '';
  return `\n\nAuthenticated employee: ${actor.name} (${actor.email}, ${actor.title}).`;
}

/** Decides which tools, prompt and argument overrides apply to this request. */
function planRequest(messages: ChatMessage[], dashboardPrompt?: DashboardPromptRequest, actor?: EmployeeProfile): RequestPlan {
  const scopedPrompt = `${systemPrompt}${actorContextNote(actor)}`;
  const latestText = [...messages].reverse().find(message => message.role === 'user')?.content ?? '';
  const recent = toModelMessages(messages.slice(-(HISTORY_WINDOW - 1)));

  if (dashboardPrompt) {
    const instruction = `Revise this employee analytics briefing using the prompt: "${dashboardPrompt.prompt}". Current briefing type: ${dashboardPrompt.scenario}. Current customerId: ${dashboardPrompt.customerId ?? 'CUST-1042'}. Current numeric assumptions: ${JSON.stringify(dashboardPrompt.inputs)}. Call only the relevant MCP tool or tools (never banking_dashboard).`;
    return {
      conversation: [{ role: 'user', content: instruction }],
      modelSystem: `${scopedPrompt} You are composing a focused analyst briefing update. Use the supplied MCP tools and call only relevant tools.`,
      latestText: dashboardPrompt.prompt,
      blocked: new Set(['banking_dashboard']),
      requiredTool: null,
      override: keepArgs,
    };
  }

  const dashboardScenario = detectDashboardIntent(latestText);
  if (dashboardScenario) {
    const detectedCustomerId = latestText.match(/\bCUST-\d+\b/i)?.[0]?.toUpperCase();
    return {
      conversation: [...recent, { role: 'user', content: `Create the ${dashboardScenario} briefing. Call banking_dashboard with scenario "${dashboardScenario}" and extract any customerId or numeric thresholds/assumptions into inputs.` }],
      modelSystem: `${scopedPrompt} The employee requested a structured briefing. Call banking_dashboard with scenario ${dashboardScenario} and populate customerId and inputs from the request.`,
      latestText,
      restrictedTools: new Set(['banking_dashboard']),
      blocked: new Set(),
      requiredTool: 'banking dashboard',
      override: (name, args) => name === 'banking_dashboard'
        ? { scenario: dashboardScenario, ...(args.customerId || detectedCustomerId ? { customerId: args.customerId ?? detectedCustomerId } : {}), inputs: args.inputs ?? {}, prompt: latestText }
        : args,
    };
  }

  if (isSavingsPlanContinuation(messages, latestText)) {
    return {
      conversation: recent,
      modelSystem: `${scopedPrompt} The employee supplied savings parameters in response to an earlier request. Extract goalAmount, currentSavings, months, and annualRate by name and call savings_goal_planner.`,
      latestText,
      restrictedTools: new Set(['savings_goal_planner']),
      blocked: new Set(),
      requiredTool: 'savings planner',
      override: keepArgs,
    };
  }

  return { conversation: toModelMessages(messages.slice(-HISTORY_WINDOW)), modelSystem: scopedPrompt, latestText, blocked: new Set(), requiredTool: null, override: keepArgs };
}

function shouldSkipRound2(plan: RequestPlan, dashboardPrompt: DashboardPromptRequest | undefined, hasError: boolean, collected: Widget[]) {
  if (hasError || !collected.length) return false;
  if (!wantsVisualWidget(plan, dashboardPrompt)) return false;
  if (dashboardPrompt || plan.requiredTool) return true;
  return !ANALYTICAL_QUERY.test(plan.latestText) && !CHAINED_QUERY.test(plan.latestText);
}

function needsToolLoopContinuation(plan: RequestPlan, hasError: boolean) {
  return hasError || CHAINED_QUERY.test(plan.latestText);
}

function dedupeWidgets(widgets: Widget[]): Widget[] {
  const dashboardCovered = new Set<string>();
  for (const w of widgets) {
    if (w.widget === 'dashboard' && Array.isArray(w.widgets)) {
      for (const inner of w.widgets as Widget[]) dashboardCovered.add(inner.widget);
    }
  }
  const seen = new Set<string>();
  return widgets.filter(w => {
    if (w.widget !== 'dashboard' && dashboardCovered.has(w.widget)) return false;
    const key = `${w.widget}:${JSON.stringify(w)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export type BankingChatOptions = {
  signal?: AbortSignal;
  onEvent?: (event: ChatStreamEvent) => void;
  actor?: EmployeeProfile;
};

function stripControlTokens(text: string | undefined) {
  if (!text) return '';
  return text.replace(/<\|tool_call>[\s\S]*?(?:<tool_call\|>|<\|tool_call\|?>|$)/g, '').trim();
}

/** Runs tool rounds until the model stops asking for tools or the round limit is reached. */
async function runToolRounds(
  history: ModelMessage[],
  tools: ModelTool[],
  plan: RequestPlan,
  dashboardPrompt: DashboardPromptRequest | undefined,
  options?: BankingChatOptions,
): Promise<{ message: ModelMessage; widgets: Widget[] }> {
  const collected: Widget[] = [];
  let message = await modelChat(history, tools, { signal: options?.signal });
  history.push(message);

  // Rounds are sequential by design: each model reply depends on the previous tool results.
  for (let round = 0; round < MAX_TOOL_ROUNDS && message.tool_calls?.length; round++) {
    const outcomes = await Promise.all(message.tool_calls.map(call => runToolCall(call, plan, options?.actor)));
    let hasError = false;
    for (const outcome of outcomes) {
      if (outcome.error) hasError = true;
      if (outcome.widget) collected.push(outcome.widget);
      history.push({ role: 'tool', content: outcome.content, name: outcome.name, tool_call_id: outcome.toolCallId });
    }

    const roundWidgets = wantsVisualWidget(plan, dashboardPrompt)
      ? (dashboardPrompt
          ? (collected.length ? [buildBriefing(collected, dashboardPrompt)] : [])
          : dedupeWidgets(collected))
      : [];
    if (roundWidgets.length) {
      options?.onEvent?.({ type: 'widgets', widgets: roundWidgets, widget: roundWidgets.at(-1) ?? null });
    }

    if (shouldSkipRound2(plan, dashboardPrompt, hasError, collected)) {
      const summary = summarizeWidgetsForUser(roundWidgets);
      options?.onEvent?.({ type: 'delta', text: summary });
      return { message: { role: 'assistant', content: summary }, widgets: collected };
    }

    const streamOpts = {
      signal: options?.signal,
      onDelta: (text: string) => options?.onEvent?.({ type: 'delta', text }),
    };

    const synthesizeFromOutcomes = async () => {
      const resultsText = collected.length
        ? collected.map(w => `${w.widget}: ${JSON.stringify(w)}`).join('\n')
        : outcomes.map(o => `${o.name}: ${o.content}`).join('\n');
      const synthesisHistory: ModelMessage[] = [
        { role: 'system', content: `${plan.modelSystem}\n\nAnalyze the retrieved tool outputs and conversation context below, and answer every part of the employee's question concisely in plain text.` },
        ...plan.conversation,
        { role: 'user', content: `Retrieved tool data:\n${resultsText}\n\nProvide your concise analysis.` },
      ];
      return options?.onEvent
        ? streamModelChat(synthesisHistory, undefined, streamOpts)
        : modelChat(synthesisHistory, undefined, { signal: options?.signal });
    };

    // For analytical synthesis without chained tool needs or errors, summarize from tool data directly without re-sending assistant.tool_calls.
    if (!needsToolLoopContinuation(plan, hasError)) {
      message = await synthesizeFromOutcomes();
      return { message, widgets: collected };
    }

    // Keep tool-enabled rounds non-streaming so providers never leak raw <|tool_call> tokens into delta.content.
    try {
      message = await modelChat(history, tools, { signal: options?.signal });
    } catch (error) {
      const text = error instanceof Error ? error.message : String(error);
      if (!/tool call|function\.arguments|BadRequest|400/i.test(text)) throw error;
      message = await synthesizeFromOutcomes();
      return { message, widgets: collected };
    }

    if (!message.tool_calls?.length) {
      const cleaned = stripControlTokens(message.content);
      if (cleaned) {
        options?.onEvent?.({ type: 'delta', text: cleaned });
        return { message: { ...message, content: cleaned }, widgets: collected };
      }
      // If the model emitted only raw control tokens without structured tool_calls, fall back to clean synthesis.
      message = await synthesizeFromOutcomes();
      return { message, widgets: collected };
    }
    history.push(message);
  }

  // Tool-call limit reached: drop the unresolved request and ask for a plain answer from the results so far.
  if (message.tool_calls?.length) {
    history.pop();
    history.push({ role: 'system', content: 'The tool-call limit was reached. Answer concisely using only the tool results above.' });
    const streamOpts = {
      signal: options?.signal,
      onDelta: (text: string) => options?.onEvent?.({ type: 'delta', text }),
    };
    message = options?.onEvent
      ? await streamModelChat(history, undefined, streamOpts)
      : await modelChat(history, undefined, { signal: options?.signal });
  } else {
    const cleaned = stripControlTokens(message.content);
    message = { ...message, content: cleaned };
    if (!collected.length && cleaned) {
      options?.onEvent?.({ type: 'delta', text: cleaned });
    }
  }
  return { message, widgets: collected };
}

function buildBriefing(collected: Widget[], request: DashboardPromptRequest): Widget {
  const unique = [...new Map(collected.map(result => [result.widget, result])).values()];
  return {
    widget: 'dashboard',
    scenario: request.scenario,
    ...(request.customerId ? { customerId: request.customerId } : {}),
    title: 'Customized analyst briefing',
    prompt: request.prompt,
    inputs: request.inputs,
    widgets: unique,
  };
}

export async function runBankingChat(messages: ChatMessage[], dashboardPrompt?: DashboardPromptRequest, options?: BankingChatOptions): Promise<ChatResponse> {
  const plan = planRequest(messages, dashboardPrompt, options?.actor);
  const tools = (await getModelTools(plan.restrictedTools)).filter(tool => !plan.blocked.has(tool.function.name));
  const history: ModelMessage[] = [{ role: 'system', content: plan.modelSystem }, ...plan.conversation];
  const { message, widgets: collected } = await runToolRounds(history, tools, plan, dashboardPrompt, options);

  if (plan.requiredTool && !collected.length) throw new Error(`The model did not call the ${plan.requiredTool} tool. Please retry.`);
  if (dashboardPrompt && !collected.length) throw new Error('The model did not select any MCP tools for this prompt. Please make the requested customer analytics query more specific.');

  const rawWidgets = dashboardPrompt ? [buildBriefing(collected, dashboardPrompt)] : dedupeWidgets(collected);
  const widgets = wantsVisualWidget(plan, dashboardPrompt) ? rawWidgets : [];
  const fallback = rawWidgets.length
    ? summarizeWidgetsForUser(rawWidgets)
    : 'I can analyze the synthetic customer portfolio, pull Customer 360 profiles, audit KYC/FOIR/card utilization risks, spot cross-sell opportunities, and run underwriting or cash-flow simulations.';
  return { answer: message.content || fallback, widget: widgets.at(-1) ?? null, widgets, model: config.model, toolInvoked: collected.length > 0 };
}
