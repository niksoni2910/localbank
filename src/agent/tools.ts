import type { DashboardScenario, Widget, WidgetKind } from '../shared/contracts.js';
import { config } from './config.js';
import type { ModelTool } from './llm.js';
import { callBankMcpTool, listBankMcpTools } from './mcp-client.js';

/** One row per approved tool: MCP tool id, the name shown to the model, and the UI widget it produces. */
const toolTable: { id: string; modelName: string; widget: WidgetKind | null }[] = [
  { id: 'account-balance', modelName: 'account_balance', widget: 'balance' },
  { id: 'recent-transactions', modelName: 'transaction_history', widget: 'transactions' },
  { id: 'card-overview', modelName: 'card_status', widget: 'cards' },
  { id: 'fixed-deposit-calculator', modelName: 'fixed_deposit_calculator', widget: 'fd' },
  { id: 'loan-emi-calculator', modelName: 'loan_emi_calculator', widget: 'emi' },
  { id: 'spending-analytics', modelName: 'spending_analytics', widget: 'spending' },
  { id: 'loan-eligibility-simulator', modelName: 'loan_eligibility_simulator', widget: 'eligibility' },
  { id: 'kyc-status', modelName: 'kyc_status', widget: 'kyc' },
  { id: 'dispute-tracker', modelName: 'dispute_tracker', widget: 'disputes' },
  { id: 'cash-flow-forecast', modelName: 'cash_flow_forecast', widget: 'cashflow' },
  { id: 'debt-payoff-comparison', modelName: 'debt_payoff_comparison', widget: 'debtPlan' },
  { id: 'savings-goal-planner', modelName: 'savings_goal_planner', widget: 'savingsGoal' },
  { id: 'banking-dashboard', modelName: 'banking_dashboard', widget: null }, // already returns a dashboard widget
];

const byId = new Map(toolTable.map(entry => [entry.id, entry]));
const byModelName = new Map(toolTable.map(entry => [entry.modelName, entry]));

let toolCache: { at: number; tools: any[] } | undefined;

async function listMcpToolsCached() {
  if (toolCache && Date.now() - toolCache.at < config.toolCacheTtlMs) return toolCache.tools;
  const tools = await listBankMcpTools();
  toolCache = { at: Date.now(), tools };
  return tools;
}

export async function getModelTools(only?: Set<string>): Promise<ModelTool[]> {
  const tools = await listMcpToolsCached();
  return tools.flatMap((tool: any) => {
    const entry = byId.get(tool.name);
    if (!entry || (only && !only.has(entry.modelName))) return [];
    return [{
      type: 'function' as const,
      function: {
        name: entry.modelName,
        description: tool.description || tool.title || tool.name,
        parameters: tool.inputSchema || { type: 'object', properties: {} },
      },
    }];
  });
}

export function isAgentTool(name: string) {
  return byModelName.has(name);
}

export async function executeAgentTool(modelName: string, args: Record<string, unknown>): Promise<Widget> {
  const entry = byModelName.get(modelName);
  if (!entry) throw new Error(`The model requested an unapproved tool: ${modelName}`);
  let raw: any;
  try {
    raw = await callBankMcpTool(entry.id, args);
  } catch (error) {
    toolCache = undefined;
    throw error;
  }
  return (entry.widget ? { widget: entry.widget, ...raw } : raw) as Widget;
}

export function updateAgentDashboard(scenario: DashboardScenario, inputs: Record<string, number>, prompt = '') {
  return executeAgentTool('banking_dashboard', { scenario, inputs, prompt });
}
