import type { MCPServer } from 'mcp-use';
import { z } from 'zod';
import {
  calculateEmi,
  calculateFd,
  compareDebtPayoff,
  getBankingDashboard,
  getLoans,
  loanEligibility,
  planSavingsGoal,
  projectCashFlow,
  resolveCustomer,
} from '../../banking.js';
import { customerIdParam, resultSchema, verifyAuthArg, withAuth } from '../shared.js';

const dashboardInputsSchema = z.object({
  monthlyIncome: z.number().min(0).describe('Customer monthly income in INR (customer-review)'),
  existingEmi: z.number().min(0).describe('Customer current monthly EMIs in INR (customer-review)'),
  requestedAmount: z.number().positive().describe('Proposed loan amount in INR (customer-review)'),
  months: z.number().int().min(1).max(600).describe('Loan or FD term in months (customer-review, cross-sell-growth)'),
  annualRate: z.number().min(0).max(40).describe('Assumed annual rate % (customer-review, cross-sell-growth)'),
  foirThreshold: z.number().min(10).max(90).describe('FOIR % threshold for risk flagging (risk-audit)'),
  utilizationThreshold: z.number().min(10).max(100).describe('Card utilization % threshold for risk flagging (risk-audit)'),
  minBalance: z.number().min(0).describe('Minimum deposit balance filter in INR (cross-sell-growth)'),
  fdPrincipal: z.number().positive().describe('Proposed FD cross-sell amount in INR (cross-sell-growth)'),
  transactionLimit: z.number().int().min(1).max(30).describe('Number of transactions to display'),
  transactionCategory: z.number().int().min(0).max(10).describe('Category filter index: 0=All, 1=Groceries, 2=Transfer, 3=Transport, 4=Income, 5=Dining, 6=Shopping, 7=Bills, 8=Cash, 9=Healthcare, 10=Entertainment'),
}).partial().describe('Numeric parameters extracted from the analyst prompt.');

export function registerSimulatorTools(server: MCPServer) {
  server.tool({
    name: 'fixed-deposit-calculator', title: 'Fixed deposit calculator', description: 'Estimate fixed deposit maturity value for an advisory/cross-sell proposal.', inputSchema: withAuth({ principal: z.number().positive(), annualRate: z.number().min(0).max(30), months: z.number().int().positive().max(600) }), outputSchema: resultSchema, view: { name: 'fd-calculator' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Illustrative FD calculation.' }], structuredContent: { data: calculateFd(args.principal, args.annualRate, args.months) } }; });

  server.tool({
    name: 'loan-emi-calculator', title: 'Loan EMI calculator', description: 'Calculate monthly EMI and total interest for a proposed loan.', inputSchema: withAuth({ principal: z.number().positive(), annualRate: z.number().min(0).max(40), months: z.number().int().positive().max(600) }), outputSchema: resultSchema, view: { name: 'loan-emi' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Illustrative loan EMI.' }], structuredContent: { data: calculateEmi(args.principal, args.annualRate, args.months) } }; });

  server.tool({
    name: 'loan-eligibility-simulator',
    title: 'Underwriting affordability simulator',
    description: 'Simulate EMI-to-income (FOIR) ratio for a proposed loan. Supply customerId to auto-load income and existing EMIs, or provide monthlyIncome and existingEmi explicitly.',
    inputSchema: withAuth({
      customerId: customerIdParam,
      monthlyIncome: z.number().positive().optional(),
      existingEmi: z.number().min(0).optional(),
      requestedAmount: z.number().positive(),
      months: z.number().int().positive(),
      annualRate: z.number().min(0).max(40).default(12),
    }),
    outputSchema: resultSchema, view: { name: 'loan-eligibility' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => {
    verifyAuthArg(args);
    const customer = args.customerId ? resolveCustomer(args.customerId) : undefined;
    const income = args.monthlyIncome ?? customer?.monthlyIncome;
    const existingEmi = args.existingEmi ?? (customer ? getLoans(customer.customerId).totalMonthlyEmi : undefined);
    if (!income || existingEmi === undefined) {
      throw new Error('Provide either customerId or both monthlyIncome and existingEmi.');
    }
    return { content: [{ type: 'text', text: 'Indicative underwriting simulation.' }], structuredContent: { data: loanEligibility(income, existingEmi, args.requestedAmount, args.months, args.annualRate) } };
  });

  server.tool({
    name: 'cash-flow-forecast', title: 'Cash-flow stress forecast', description: 'Project monthly cash flow and ending balances from income and expense assumptions.',
    inputSchema: withAuth({ monthlyIncome: z.number().min(0), fixedExpenses: z.number().min(0), variableBudget: z.number().min(0), months: z.number().int().min(1).max(12), startingBalance: z.number().min(0) }),
    outputSchema: resultSchema, view: { name: 'cashflow-forecast' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Illustrative cash-flow forecast.' }], structuredContent: { data: projectCashFlow(args.monthlyIncome, args.fixedExpenses, args.variableBudget, args.months, args.startingBalance) } }; });

  server.tool({
    name: 'debt-payoff-comparison',
    title: 'Debt payoff comparison',
    description: 'Compare estimated interest and payoff timeline with and without extra monthly payments. Pass customerId to auto-load the customer\'s primary loan, or pass balance, annualRate, and monthlyPayment explicitly.',
    inputSchema: withAuth({
      customerId: customerIdParam,
      loanId: z.string().optional().describe('Optional loan ID (e.g. LN-304) when customer has multiple loans'),
      balance: z.number().positive().optional(),
      annualRate: z.number().min(0).max(60).optional(),
      monthlyPayment: z.number().positive().optional(),
      extraPayment: z.number().min(0).default(0).describe('Extra monthly payment amount in INR'),
    }),
    outputSchema: resultSchema, view: { name: 'debt-payoff' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => {
    verifyAuthArg(args);
    const customer = args.customerId ? resolveCustomer(args.customerId) : undefined;
    const targetLoan = customer
      ? (args.loanId ? customer.loans.find(l => l.id.toLowerCase() === args.loanId!.toLowerCase()) : customer.loans[0])
      : undefined;
    const balance = args.balance ?? targetLoan?.principalOutstanding;
    const annualRate = args.annualRate ?? targetLoan?.rate;
    const monthlyPayment = args.monthlyPayment ?? targetLoan?.emi;
    if (!balance || annualRate === undefined || !monthlyPayment) {
      throw new Error('Provide balance, annualRate, and monthlyPayment (or a customerId with an active loan).');
    }
    const result = compareDebtPayoff(balance, annualRate, monthlyPayment, args.extraPayment);
    return {
      content: [{ type: 'text', text: 'Illustrative debt payoff comparison.' }],
      structuredContent: {
        data: {
          ...(customer ? { customerId: customer.customerId, customerName: customer.customerName } : {}),
          ...(targetLoan ? { loanId: targetLoan.id, loanType: targetLoan.type } : {}),
          ...result,
        },
      },
    };
  });

  server.tool({
    name: 'savings-goal-planner', title: 'Savings advisory planner', description: 'Estimate the monthly contribution needed for a target savings goal.',
    inputSchema: withAuth({ goalAmount: z.number().positive(), currentSavings: z.number().min(0), months: z.number().int().min(1).max(600), annualRate: z.number().min(0).max(30) }),
    outputSchema: resultSchema, view: { name: 'savings-goal' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Illustrative savings advisory plan.' }], structuredContent: { data: planSavingsGoal(args.goalAmount, args.currentSavings, args.months, args.annualRate) } }; });

  return server.tool({
    name: 'banking-dashboard',
    title: 'Analyst intelligence briefing',
    description: 'Generate an analyst briefing dashboard across portfolio-summary, customer-review, risk-audit, or cross-sell-growth scenarios.',
    inputSchema: withAuth({
      scenario: z.enum(['portfolio-summary', 'customer-review', 'risk-audit', 'cross-sell-growth']),
      customerId: customerIdParam,
      inputs: dashboardInputsSchema.optional(),
      prompt: z.string().optional(),
    }),
    outputSchema: resultSchema,
    view: { name: 'banking-dashboard' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async ({ scenario, customerId, inputs, prompt, _auth }) => {
    verifyAuthArg({ _auth });
    return {
      content: [{ type: 'text', text: 'Synthetic analyst briefing.' }],
      structuredContent: { data: getBankingDashboard(scenario, inputs, prompt, customerId) },
    };
  });
}
