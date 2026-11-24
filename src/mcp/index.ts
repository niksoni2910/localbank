import { MCPServer } from 'mcp-use';
import { z } from 'zod';
import { demoCustomer, getBalance, getTransactions, calculateFd, calculateEmi, spendingInsights, loanEligibility, projectCashFlow, compareDebtPayoff, planSavingsGoal, getBankingDashboard } from '../banking.js';

const server = new MCPServer({ name: 'local-bank-customer-assistant', title: 'LocalBank AI', version: '0.1.0' });
const resultSchema = z.object({ data: z.record(z.string(), z.any()) });

server.tool({
  name: 'account-balance', title: 'Account balance', description: 'Retrieve balances for synthetic demo accounts.', inputSchema: z.object({}), outputSchema: resultSchema, view: { name: 'balance-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async () => ({ content: [{ type: 'text', text: 'Synthetic account balance overview.' }], structuredContent: { data: getBalance() } }));

server.tool({
  name: 'recent-transactions', title: 'Recent transactions', description: 'View synthetic transaction history, optionally filtered by category.', inputSchema: z.object({ limit: z.number().int().min(1).max(20).default(8), category: z.string().optional() }), outputSchema: resultSchema, view: { name: 'transaction-table' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async ({ limit, category }) => ({ content: [{ type: 'text', text: 'Synthetic transaction list.' }], structuredContent: { data: getTransactions(limit, category) } }));

server.tool({
  name: 'fixed-deposit-calculator', title: 'Fixed deposit calculator', description: 'Estimate fixed deposit maturity amount.', inputSchema: z.object({ principal: z.number().positive(), annualRate: z.number().min(0).max(30), months: z.number().int().positive().max(600) }), outputSchema: resultSchema, view: { name: 'fd-calculator' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async (args) => ({ content: [{ type: 'text', text: 'Illustrative FD calculation.' }], structuredContent: { data: calculateFd(args.principal, args.annualRate, args.months) } }));
server.tool({
  name: 'spending-analytics', title: 'Spending analytics', description: 'Show demo spending by category.', inputSchema: z.object({}), outputSchema: resultSchema, view: { name: 'spending-chart' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async () => ({ content: [{ type: 'text', text: 'Synthetic spending breakdown.' }], structuredContent: { data: spendingInsights() } }));
server.tool({
  name: 'loan-emi-calculator', title: 'Loan EMI calculator', description: 'Calculate EMI for a proposed loan.', inputSchema: z.object({ principal: z.number().positive(), annualRate: z.number().min(0).max(40), months: z.number().int().positive().max(600) }), outputSchema: resultSchema, view: { name: 'loan-emi' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async (args) => ({ content: [{ type: 'text', text: 'Illustrative loan EMI.' }], structuredContent: { data: calculateEmi(args.principal, args.annualRate, args.months) } }));
server.tool({
  name: 'loan-eligibility-simulator', title: 'Loan eligibility simulator', description: 'Estimate EMI-to-income ratio and indicative affordability for a hypothetical loan.', inputSchema: z.object({ monthlyIncome: z.number().positive(), existingEmi: z.number().min(0), requestedAmount: z.number().positive(), months: z.number().int().positive(), annualRate: z.number().min(0).max(40).default(12) }), outputSchema: resultSchema, view: { name: 'loan-eligibility' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async (args) => ({ content: [{ type: 'text', text: 'Indicative affordability simulation. Not a credit decision.' }], structuredContent: { data: loanEligibility(args.monthlyIncome, args.existingEmi, args.requestedAmount, args.months, args.annualRate) } }));
server.tool({
  name: 'kyc-status', title: 'KYC status', description: 'Check demo KYC verification status.', inputSchema: z.object({}), outputSchema: resultSchema, view: { name: 'kyc-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async () => ({ content: [{ type: 'text', text: 'Synthetic KYC status.' }], structuredContent: { data: demoCustomer.kyc } }));
server.tool({
  name: 'card-overview', title: 'Card overview', description: 'Show synthetic debit and credit card status and limits.', inputSchema: z.object({}), outputSchema: resultSchema, view: { name: 'cards-summary' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async () => ({ content: [{ type: 'text', text: 'Synthetic card overview.' }], structuredContent: { data: { cards: demoCustomer.cards } } }));
server.tool({
  name: 'dispute-tracker', title: 'Dispute tracker', description: 'Check sample dispute status and estimated resolution.', inputSchema: z.object({}), outputSchema: resultSchema, view: { name: 'dispute-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
}, async () => ({ content: [{ type: 'text', text: 'Synthetic dispute tracker.' }], structuredContent: { data: { disputes: demoCustomer.disputes } } }));

server.tool({
  name: 'cash-flow-forecast', title: 'Cash-flow forecast', description: 'Project monthly cash flow and ending balances from user-provided income and expense assumptions.',
  inputSchema: z.object({ monthlyIncome: z.number().min(0), fixedExpenses: z.number().min(0), variableBudget: z.number().min(0), months: z.number().int().min(1).max(12), startingBalance: z.number().min(0) }),
  outputSchema: resultSchema, view: { name: 'cashflow-forecast' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
}, async (args) => ({ content: [{ type: 'text', text: 'Illustrative cash-flow forecast from supplied assumptions.' }], structuredContent: { data: projectCashFlow(args.monthlyIncome, args.fixedExpenses, args.variableBudget, args.months, args.startingBalance) } }));

server.tool({
  name: 'debt-payoff-comparison', title: 'Debt payoff comparison', description: 'Compare estimated interest and payoff time with and without an extra monthly payment.',
  inputSchema: z.object({ balance: z.number().positive(), annualRate: z.number().min(0).max(60), monthlyPayment: z.number().positive(), extraPayment: z.number().min(0) }),
  outputSchema: resultSchema, view: { name: 'debt-payoff' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
}, async (args) => ({ content: [{ type: 'text', text: 'Illustrative debt payoff comparison. No payment was made.' }], structuredContent: { data: compareDebtPayoff(args.balance, args.annualRate, args.monthlyPayment, args.extraPayment) } }));

server.tool({
  name: 'savings-goal-planner', title: 'Savings goal planner', description: 'Estimate the monthly contribution required for a target savings amount and timeline.',
  inputSchema: z.object({ goalAmount: z.number().positive(), currentSavings: z.number().min(0), months: z.number().int().min(1).max(600), annualRate: z.number().min(0).max(30) }),
  outputSchema: resultSchema, view: { name: 'savings-goal' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
}, async (args) => ({ content: [{ type: 'text', text: 'Illustrative savings goal calculation; returns are not guaranteed.' }], structuredContent: { data: planSavingsGoal(args.goalAmount, args.currentSavings, args.months, args.annualRate) } }));

export const bankingDashboard = server.tool({
  name: 'banking-dashboard', title: 'Prompt-based banking review', description: 'Create a focused banking review. Select only the relevant widgets based on the supplied prompt.',
  inputSchema: z.object({ scenario: z.enum(['financial-health', 'credit-readiness', 'savings-plan', 'card-activity']), inputs: z.record(z.string(), z.number().finite()).optional(), prompt: z.string().optional() }),
  outputSchema: resultSchema, view: { name: 'banking-dashboard' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
}, async ({ scenario, inputs, prompt }) => ({ content: [{ type: 'text', text: 'Prompt-based synthetic banking review, updated from the supplied values.' }], structuredContent: { data: getBankingDashboard(scenario, inputs, prompt) } }));

export default server;
