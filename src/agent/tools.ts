import { signActorToken } from '../auth.js';
import type { DashboardScenario, EmployeeProfile, Widget, WidgetKind } from '../shared/contracts.js';
import type { ModelTool } from './llm.js';
import { callBankMcpTool, listBankMcpTools } from './mcp-client.js';

/** One row per approved tool: MCP tool id, the name shown to the model, and the UI widget it produces. */
const toolTable: { id: string; modelName: string; widget: WidgetKind | null }[] = [
  { id: 'portfolio-overview', modelName: 'portfolio_overview', widget: 'portfolio' },
  { id: 'branch-overview', modelName: 'branch_overview', widget: 'branches' },
  { id: 'customer-search', modelName: 'customer_search', widget: 'customers' },
  { id: 'customer-profile', modelName: 'customer_profile', widget: 'customer360' },
  { id: 'segment-insights', modelName: 'segment_insights', widget: 'insights' },
  { id: 'risk-and-compliance', modelName: 'risk_and_compliance', widget: 'risk' },
  { id: 'product-penetration', modelName: 'product_penetration', widget: 'penetration' },
  { id: 'regional-breakdown', modelName: 'regional_breakdown', widget: 'regions' },
  { id: 'liquidity-and-maturities', modelName: 'liquidity_and_maturities', widget: 'liquidity' },
  { id: 'churn-and-retention', modelName: 'churn_and_retention', widget: 'retention' },
  { id: 'account-balance', modelName: 'account_balance', widget: 'balance' },
  { id: 'recent-transactions', modelName: 'transaction_history', widget: 'transactions' },
  { id: 'card-overview', modelName: 'card_status', widget: 'cards' },
  { id: 'fixed-deposit-calculator', modelName: 'fixed_deposit_calculator', widget: 'fd' },
  { id: 'fixed-deposits', modelName: 'fixed_deposits', widget: 'fds' },
  { id: 'loan-emi-calculator', modelName: 'loan_emi_calculator', widget: 'emi' },
  { id: 'loan-accounts', modelName: 'loan_accounts', widget: 'loans' },
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

function sanitizeParametersSchema(schema: any) {
  if (!schema || typeof schema !== 'object') return { type: 'object', properties: {} };
  const properties = schema.properties && typeof schema.properties === 'object' ? { ...schema.properties } : {};
  delete properties._auth;
  const required = Array.isArray(schema.required) ? schema.required.filter((k: string) => k !== '_auth') : undefined;
  return { ...schema, properties, ...(required ? { required } : {}) };
}

export async function getModelTools(only?: Set<string>): Promise<ModelTool[]> {
  const tools = await listBankMcpTools();
  return tools.flatMap((tool: any) => {
    const entry = byId.get(tool.name);
    if (!entry || (only && !only.has(entry.modelName))) return [];
    return [{
      type: 'function' as const,
      function: {
        name: entry.modelName,
        description: tool.description || tool.title || tool.name,
        parameters: sanitizeParametersSchema(tool.inputSchema),
      },
    }];
  });
}

export function isAgentTool(name: string) {
  return byModelName.has(name);
}

export async function executeAgentTool(modelName: string, args: Record<string, unknown>, actor?: EmployeeProfile): Promise<Widget> {
  const entry = byModelName.get(modelName);
  if (!entry) throw new Error(`The model requested an unapproved tool: ${modelName}`);
  const { _auth: _ignored, ...cleanArgs } = args;
  const scopedArgs = actor ? { ...cleanArgs, _auth: signActorToken(actor) } : cleanArgs;
  const raw = await callBankMcpTool(entry.id, scopedArgs);
  return (entry.widget ? { widget: entry.widget, ...raw } : raw) as Widget;
}

export function updateAgentDashboard(scenario: DashboardScenario, inputs: Record<string, number>, prompt = '', customerId?: string, actor?: EmployeeProfile) {
  return executeAgentTool('banking_dashboard', { scenario, inputs, prompt, ...(customerId ? { customerId } : {}) }, actor);
}
