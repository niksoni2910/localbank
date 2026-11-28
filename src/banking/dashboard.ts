import { getFixedDeposits, getLoans, getTransactions, spendingInsights } from './customer.js';
import { getCustomerProfile } from './customer.js';
import { computeCustomerMetrics, resolveCustomer } from './metrics.js';
import {
  getBranchOverview,
  getChurnAndRetention,
  getLiquidityAndMaturities,
  getPortfolioOverview,
  getProductPenetration,
  getRegionalBreakdown,
  getRiskAndCompliance,
  getSegmentInsights,
  searchCustomers,
} from './portfolio.js';
import { calculateFd, compareDebtPayoff, loanEligibility, projectCashFlow } from './simulators.js';
import type { BankingDashboardScenario } from './types.js';

export function getBankingDashboard(scenario: BankingDashboardScenario, rawInputs: Record<string, number> = {}, prompt = '', customerId?: string) {
  const numberInput = (key: string, fallback: number, min: number, max: number) => {
    const value = Number(rawInputs[key]);
    return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
  };
  const customer = resolveCustomer(customerId);
  const metrics = computeCustomerMetrics(customer);
  const primaryLoan = customer.loans[0] ?? { principalOutstanding: 480000, rate: 10.5, emi: 15950 };
  const transactionCategories = ['Groceries', 'Transfer', 'Transport', 'Income', 'Dining', 'Shopping', 'Bills', 'Cash', 'Healthcare', 'Entertainment'];
  const transactionCategoryIndex = Math.floor(numberInput('transactionCategory', 0, 0, transactionCategories.length));

  const inputsByScenario: Record<BankingDashboardScenario, Record<string, number>> = {
    'portfolio-summary': {
      transactionLimit: numberInput('transactionLimit', 10, 1, 50),
      transactionCategory: transactionCategoryIndex,
    },
    'customer-review': {
      monthlyIncome: numberInput('monthlyIncome', customer.monthlyIncome, 1, 10000000),
      existingEmi: numberInput('existingEmi', metrics.totalMonthlyEmi, 0, 10000000),
      requestedAmount: numberInput('requestedAmount', 500000, 1, 100000000),
      months: numberInput('months', 36, 1, 600),
      annualRate: numberInput('annualRate', 11.5, 0, 40),
      transactionLimit: numberInput('transactionLimit', 8, 1, 50),
    },
    'risk-audit': {
      foirThreshold: numberInput('foirThreshold', 45, 10, 90),
      utilizationThreshold: numberInput('utilizationThreshold', 70, 10, 100),
      transactionLimit: numberInput('transactionLimit', 10, 1, 50),
    },
    'cross-sell-growth': {
      minBalance: numberInput('minBalance', 300000, 0, 100000000),
      fdPrincipal: numberInput('fdPrincipal', 500000, 1000, 100000000),
      annualRate: numberInput('annualRate', 7.25, 0, 30),
      months: numberInput('months', 24, 1, 600),
    },
  };

  const inputs = inputsByScenario[scenario];
  const promptWidgetRules: Array<[string, RegExp]> = [
    ['portfolio', /\bportfolio\b|\boverview\b|\bAUM\b|\bsegments?\b/i],
    ['branches', /\bbranch(?:es)?\b|\bIFSC\b/i],
    ['customer360', /\bcustomer\b|\bprofile\b|\b360\b|\bCUST-\d+/i],
    ['customers', /\bsearch\b|\blist\b|\bfilter\b|\bcohort\b/i],
    ['insights', /\binsights?\b|\bopportunit|\bcross[- ]?sell\b|\bgrowth\b/i],
    ['risk', /\brisk\b|\bcompliance\b|\bKYC\b|\bFOIR\b|\butilization\b|\bdispute/i],
    ['penetration', /\bpenetration\b|\badoption\b|\bwallet\b|\bwhitespace\b/i],
    ['regions', /\bregion|\bcity\b|\bcities\b|\bgeographic/i],
    ['liquidity', /\bliquidity\b|\bmatur|\bidle cash\b|\bsweep\b|\bLDR\b/i],
    ['retention', /\bretention\b|\bchurn\b|\bengagement\b|\bloyal/i],
    ['loans', /\bloan accounts?\b|\bactive loans?\b|\bloans?\b/i],
    ['fds', /\bactive fds?\b|\bexisting fixed deposits?\b/i],
    ['cards', /\bcards?\b|\bcredit card\b|\bdebit card\b/i],
    ['spending', /\bspending\b|\bcategories\b|\bexpenses?\b/i],
    ['transactions', /\btransactions?\b|\bactivity\b|\bpurchases?\b/i],
    ['eligibility', /\beligib|\baffordability\b|\bunderwrit|\bloan\b/i],
    ['fd', /fixed deposit|\bFD\b|maturity/i],
  ];
  const requestedWidgets = promptWidgetRules.filter(([, pattern]) => pattern.test(prompt)).map(([widget]) => widget);
  const defaultWidgets: Record<BankingDashboardScenario, string[]> = {
    'portfolio-summary': ['portfolio', 'branches', 'penetration', 'insights', 'spending'],
    'customer-review': ['customer360', 'loans', 'fds', 'transactions', 'eligibility'],
    'risk-audit': ['risk', 'retention', 'transactions'],
    'cross-sell-growth': ['insights', 'liquidity', 'penetration', 'customers', 'fd'],
  };
  const widgetTypes = requestedWidgets.length ? requestedWidgets : defaultWidgets[scenario];

  const widgets = widgetTypes.map(widget => {
    switch (widget) {
      case 'portfolio': return { widget, ...getPortfolioOverview() };
      case 'branches': return { widget, ...getBranchOverview() };
      case 'customer360': return { widget, ...getCustomerProfile(customer.customerId) };
      case 'customers': return { widget, ...searchCustomers({ minBalance: inputs.minBalance }) };
      case 'insights': return { widget, ...getSegmentInsights() };
      case 'risk': return { widget, ...getRiskAndCompliance(inputs.foirThreshold ?? 45, inputs.utilizationThreshold ?? 70) };
      case 'penetration': return { widget, ...getProductPenetration() };
      case 'regions': return { widget, ...getRegionalBreakdown() };
      case 'liquidity': return { widget, ...getLiquidityAndMaturities() };
      case 'retention': return { widget, ...getChurnAndRetention() };
      case 'loans': return { widget, ...getLoans(customer.customerId) };
      case 'fds': return { widget, ...getFixedDeposits(customer.customerId) };
      case 'cards': return { widget, customerId: customer.customerId, customerName: customer.customerName, cards: customer.cards };
      case 'spending': return { widget, ...spendingInsights(scenario === 'customer-review' ? customer.customerId : undefined) };
      case 'transactions': {
        const limit = inputs.transactionLimit ?? 10;
        const catIdx = inputs.transactionCategory ?? 0;
        const status = scenario === 'risk-audit' ? 'Disputed' : undefined;
        return { widget, ...getTransactions(limit, catIdx ? transactionCategories[catIdx - 1] : undefined, scenario === 'customer-review' ? customer.customerId : undefined, status) };
      }
      case 'eligibility': return { widget, ...loanEligibility(inputs.monthlyIncome ?? customer.monthlyIncome, inputs.existingEmi ?? metrics.totalMonthlyEmi, inputs.requestedAmount ?? 500000, inputs.months ?? 36, inputs.annualRate ?? 11.5), scenarioNote: `Underwriting simulation for ${customer.customerName} (${customer.customerId}).` };
      case 'fd': return { widget, ...calculateFd(inputs.fdPrincipal ?? 500000, inputs.annualRate ?? 7.25, inputs.months ?? 24), scenarioNote: 'Illustrative FD yield proposal for cross-sell discussion.' };
      case 'cashflow': return { widget, ...projectCashFlow(customer.monthlyIncome, customer.monthlyFixedExpenses, customer.monthlyVariableSpend, 6, metrics.totalBalance) };
      case 'debtPlan': return { widget, ...compareDebtPayoff(primaryLoan.principalOutstanding, primaryLoan.rate, primaryLoan.emi, 3000) };
      default: return null;
    }
  }).filter(Boolean);

  const titles: Record<BankingDashboardScenario, string> = {
    'portfolio-summary': 'Portfolio intelligence briefing',
    'customer-review': `Customer 360 review · ${customer.customerName}`,
    'risk-audit': 'Risk & compliance audit',
    'cross-sell-growth': 'Growth & cross-sell opportunities',
  };

  return { widget: 'dashboard', scenario, customerId: customer.customerId, title: titles[scenario], prompt, inputs, widgets };
}
