// Demo banking data only. Never connect this prototype to a real account.
export const demoCustomer = {
  customerName: 'Alex Morgan', customerId: 'CUST-DEMO-1042',
  accounts: [
    { id: 'AC-003', type: 'Emergency Savings', masked: 'xxxx 9056', balance: 325000.00, currency: 'INR' },
    { id: 'AC-001', type: 'Savings', masked: '•••• 2841', balance: 184250.75, currency: 'INR' },
    { id: 'AC-002', type: 'Salary', masked: '•••• 7310', balance: 92750.00, currency: 'INR' },
  ],
  cards: [
    { id: 'CARD-03', name: 'Everyday Rewards', masked: 'xxxx 4482', status: 'Active', creditLimit: 125000, available: 98400, dueDate: '2026-12-12', outstanding: 26600 },
    { id: 'CARD-01', name: 'Platinum Debit', masked: '•••• •••• •••• 2841', status: 'Active', dailyLimit: 50000, usedToday: 12400 },
    { id: 'CARD-02', name: 'Travel Credit', masked: '•••• •••• •••• 6209', status: 'Active', creditLimit: 200000, available: 156400, dueDate: '2026-12-05', outstanding: 43600 }
  ],
  kyc: { status: 'Verified', lastUpdated: '2026-08-12', nextReview: '2028-08-12', pendingItems: [] },
  transactions: [
    { date: '2026-11-23', time: '09:12', merchant: 'Monthly Interest Credit', category: 'Interest', amount: 742, account: 'xxxx 9056', status: 'Completed', reference: 'TXN-89201' },
    { date: '2026-11-22', time: '18:46', merchant: 'Pharmacy Plus', category: 'Healthcare', amount: -1640, account: 'xxxx 2841', status: 'Completed', reference: 'TXN-89198' },
    { date: '2026-11-22', time: '15:20', merchant: 'Online Marketplace', category: 'Shopping', amount: -3499, account: 'xxxx 6209', status: 'Disputed', reference: 'TXN-89195' },
    { date: '2026-11-21', time: '08:32', merchant: 'Metro Transit Pass', category: 'Transport', amount: -1800, account: 'xxxx 2841', status: 'Completed', reference: 'TXN-89190' },
    { date: '2026-11-21', time: '20:05', merchant: 'Streaming Service', category: 'Entertainment', amount: -899, account: 'xxxx 6209', status: 'Completed', reference: 'TXN-89187' },
    { date: '2026-11-20', time: '14:22', merchant: 'Metro Grocery', category: 'Groceries', amount: -1840, account: '•••• 2841', status: 'Completed', reference: 'TXN-89123' },
    { date: '2026-11-20', time: '12:03', merchant: 'UPI • Rahul S', category: 'Transfer', amount: -1200, account: '•••• 2841', status: 'Completed', reference: 'TXN-89122' },
    { date: '2026-11-19', time: '19:42', merchant: 'Fuel Station', category: 'Transport', amount: -2500, account: '•••• 2841', status: 'Completed', reference: 'TXN-89118' },
    { date: '2026-11-19', time: '10:01', merchant: 'Salary Credit', category: 'Income', amount: 85000, account: '•••• 7310', status: 'Completed', reference: 'TXN-89115' },
    { date: '2026-11-18', time: '20:35', merchant: 'Food Delivery', category: 'Dining', amount: -780, account: '•••• 2841', status: 'Completed', reference: 'TXN-89110' },
    { date: '2026-11-18', time: '16:11', merchant: 'Electronics Store', category: 'Shopping', amount: -15999, account: '•••• 6209', status: 'Completed', reference: 'TXN-89108' },
    { date: '2026-11-17', time: '09:55', merchant: 'Electricity Bill', category: 'Bills', amount: -3200, account: '•••• 2841', status: 'Completed', reference: 'TXN-89097' },
    { date: '2026-11-16', time: '18:28', merchant: 'Book Store', category: 'Shopping', amount: -1260, account: '•••• 2841', status: 'Completed', reference: 'TXN-89084' },
    { date: '2026-11-15', time: '13:18', merchant: 'Restaurant', category: 'Dining', amount: -2200, account: '•••• 2841', status: 'Completed', reference: 'TXN-89076' },
    { date: '2026-11-14', time: '11:02', merchant: 'ATM Withdrawal', category: 'Cash', amount: -5000, account: '•••• 2841', status: 'Completed', reference: 'TXN-89061' }
  ],
  spending: [
    { category: 'Healthcare', amount: 3850 }, { category: 'Education', amount: 2450 },
    { category: 'Travel', amount: 11200 }, { category: 'Insurance', amount: 4200 },
    { category: 'Utilities', amount: 3150 },
    { category: 'Groceries', amount: 12450 }, { category: 'Dining', amount: 8200 },
    { category: 'Transport', amount: 5600 }, { category: 'Shopping', amount: 17990 },
    { category: 'Bills', amount: 7100 }, { category: 'Entertainment', amount: 4500 }
  ],
  fd: [
    { id: 'FD-104', principal: 250000, rate: 7.1, tenureMonths: 24, maturityAmount: 288445, maturityDate: '2027-06-21', status: 'Active' },
    { id: 'FD-118', principal: 150000, rate: 6.85, tenureMonths: 18, maturityAmount: 166115, maturityDate: '2027-09-10', status: 'Active' },
  ],
  loans: [
    { id: 'LN-12', type: 'Personal Loan', principalOutstanding: 480000, rate: 10.5, emi: 15950, remainingMonths: 36, nextDue: '2026-12-03' },
    { id: 'LN-19', type: 'Vehicle Loan', principalOutstanding: 625000, rate: 9.2, emi: 13200, remainingMonths: 54, nextDue: '2026-12-08' },
  ],
  disputes: [
    { id: 'DSP-207', merchant: 'Online Marketplace', amount: 3499, filed: '2026-11-12', status: 'Investigation in progress', estimatedResolution: '2026-12-02', reason: 'Card transaction not recognized' },
    { id: 'DSP-198', merchant: 'QuickCab Mobility', amount: 680, filed: '2026-10-29', status: 'Provisional credit issued', estimatedResolution: '2026-11-28', reason: 'Duplicate transaction' },
  ]
};

export function getBalance() {
  const total = demoCustomer.accounts.reduce((sum, a) => sum + a.balance, 0);
  return { accounts: demoCustomer.accounts, totalBalance: total, currency: 'INR' };
}
export function getTransactions(limit = 8, category?: string) {
  const rows = category ? demoCustomer.transactions.filter(t => t.category.toLowerCase() === category.toLowerCase()) : demoCustomer.transactions;
  return { transactions: rows.slice(0, Math.max(1, Math.min(limit, 20))), count: rows.length };
}
export function calculateFd(principal: number, annualRate: number, months: number) {
  const maturity = principal * Math.pow(1 + annualRate / 400, 4 * months / 12);
  return { principal, annualRate, months, maturityAmount: Math.round(maturity * 100) / 100, interestEarned: Math.round((maturity - principal) * 100) / 100, calculation: 'Illustrative quarterly compounding; verify bank terms.' };
}
export function calculateEmi(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  return { principal, annualRate, months, monthlyEmi: Math.round(emi * 100) / 100, totalPayable: Math.round(emi * months * 100) / 100, totalInterest: Math.round((emi * months - principal) * 100) / 100 };
}
export function spendingInsights() {
  const total = demoCustomer.spending.reduce((s, c) => s + c.amount, 0);
  const largest = [...demoCustomer.spending].sort((a,b) => b.amount-a.amount)[0];
  return { spending: demoCustomer.spending, total, topCategory: largest.category, topCategoryAmount: largest.amount, savingsRateEstimate: 22, note: 'Demo estimate from sample data; not financial advice.' };
}
export function loanEligibility(monthlyIncome: number, existingEmi: number, requestedAmount: number, months: number, annualRate = 12) {
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? requestedAmount/months : requestedAmount*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1);
  const foir = ((existingEmi + emi) / monthlyIncome) * 100;
  return { monthlyIncome, existingEmi, requestedAmount, months, estimatedEmi: Math.round(emi), estimatedFoirPercent: Math.round(foir*10)/10, indicative: foir <= 50, note: 'Indicative simulation only. Actual approval requires bank underwriting and verification.' };
}

export function projectCashFlow(monthlyIncome: number, fixedExpenses: number, variableBudget: number, months: number, startingBalance: number) {
  const horizon = Math.max(1, Math.min(12, Math.floor(months)));
  const netMonthly = monthlyIncome - fixedExpenses - variableBudget;
  const projection = Array.from({ length: horizon }, (_, index) => ({
    month: index + 1,
    income: monthlyIncome,
    expenses: fixedExpenses + variableBudget,
    netCashFlow: netMonthly,
    projectedBalance: Math.round((startingBalance + netMonthly * (index + 1)) * 100) / 100,
  }));
  return {
    monthlyIncome, fixedExpenses, variableBudget, months: horizon, startingBalance,
    netMonthlyCashFlow: netMonthly,
    endingBalance: projection.at(-1)?.projectedBalance ?? startingBalance,
    lowestProjectedBalance: Math.min(startingBalance, ...projection.map(row => row.projectedBalance)),
    projection,
    note: 'Illustrative forecast assumes the same income and spending each month; it does not predict pending transactions.',
  };
}

function simulateDebtPayoff(balance: number, annualRate: number, monthlyPayment: number, extraPayment: number) {
  const monthlyRate = annualRate / 1200;
  let remaining = balance;
  let totalInterest = 0;
  let months = 0;
  while (remaining > 0.01 && months < 1200) {
    const interest = remaining * monthlyRate;
    const payment = Math.min(remaining + interest, monthlyPayment + extraPayment);
    if (payment <= interest) return { months: null, totalInterest: null, paidOff: false };
    totalInterest += interest;
    remaining = Math.max(0, remaining + interest - payment);
    months++;
  }
  return { months, totalInterest: Math.round(totalInterest * 100) / 100, paidOff: remaining <= 0.01 };
}

export function compareDebtPayoff(balance: number, annualRate: number, monthlyPayment: number, extraPayment = 0) {
  const standard = simulateDebtPayoff(balance, annualRate, monthlyPayment, 0);
  const accelerated = simulateDebtPayoff(balance, annualRate, monthlyPayment, extraPayment);
  return {
    balance, annualRate, monthlyPayment, extraPayment,
    standard, accelerated,
    interestSaved: standard.totalInterest === null || accelerated.totalInterest === null
      ? null : Math.round((standard.totalInterest - accelerated.totalInterest) * 100) / 100,
    monthsSaved: standard.months === null || accelerated.months === null
      ? null : standard.months - accelerated.months,
    note: 'Illustrative amortization comparison. Actual lender fees, payment dates, and prepayment rules are not included.',
  };
}

export function planSavingsGoal(goalAmount: number, currentSavings: number, months: number, annualRate = 0) {
  const horizon = Math.max(1, Math.min(600, Math.floor(months)));
  const monthlyRate = annualRate / 1200;
  const futureCurrent = currentSavings * Math.pow(1 + monthlyRate, horizon);
  const denominator = monthlyRate === 0 ? horizon : (Math.pow(1 + monthlyRate, horizon) - 1) / monthlyRate;
  const monthlyContribution = Math.max(0, (goalAmount - futureCurrent) / denominator);
  const projectedValue = futureCurrent + monthlyContribution * denominator;
  return {
    goalAmount, currentSavings, months: horizon, annualRate,
    monthlyContribution: Math.round(monthlyContribution * 100) / 100,
    totalContributions: Math.round((currentSavings + monthlyContribution * horizon) * 100) / 100,
    estimatedGrowth: Math.round((projectedValue - currentSavings - monthlyContribution * horizon) * 100) / 100,
    projectedValue: Math.round(projectedValue * 100) / 100,
    note: 'Illustrative savings plan. Returns are assumed constant and are not guaranteed.',
  };
}

export type BankingDashboardScenario = 'financial-health' | 'credit-readiness' | 'savings-plan' | 'card-activity';

export function getBankingDashboard(scenario: BankingDashboardScenario, rawInputs: Record<string, number> = {}, prompt = '') {
  const numberInput = (key: string, fallback: number, min: number, max: number) => {
    const value = Number(rawInputs[key]);
    return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
  };
  const loan = demoCustomer.loans[0];
  const transactionCategories = ['Groceries', 'Transfer', 'Transport', 'Income', 'Dining', 'Shopping', 'Bills', 'Cash'];
  const transactionCategoryIndex = Math.floor(numberInput('transactionCategory', 0, 0, transactionCategories.length));
  const inputsByScenario: Record<BankingDashboardScenario, Record<string, number>> = {
    'financial-health': {
      monthlyIncome: numberInput('monthlyIncome', 85000, 0, 10000000),
      fixedExpenses: numberInput('fixedExpenses', 30000, 0, 10000000),
      variableBudget: numberInput('variableBudget', 26000, 0, 10000000),
      months: numberInput('months', 6, 1, 12),
      startingBalance: numberInput('startingBalance', getBalance().totalBalance, 0, 100000000),
      extraPayment: numberInput('extraPayment', 3000, 0, 10000000),
    },
    'credit-readiness': {
      monthlyIncome: numberInput('monthlyIncome', 85000, 1, 10000000),
      existingEmi: numberInput('existingEmi', loan.emi, 0, 10000000),
      requestedAmount: numberInput('requestedAmount', 500000, 1, 100000000),
      months: numberInput('months', 36, 1, 600),
      annualRate: numberInput('annualRate', 12, 0, 40),
    },
    'savings-plan': {
      goalAmount: numberInput('goalAmount', 300000, 1, 100000000),
      currentSavings: numberInput('currentSavings', demoCustomer.accounts[0].balance, 0, 100000000),
      months: numberInput('months', 18, 1, 600),
      annualRate: numberInput('annualRate', 4, 0, 30),
    },
    'card-activity': {
      transactionLimit: numberInput('transactionLimit', 8, 1, 20),
      transactionCategory: transactionCategoryIndex,
    },
  };
  const inputs = inputsByScenario[scenario];
  const limit = inputs.transactionLimit ?? numberInput('transactionLimit', 8, 1, 20);
  const categoryIndex = inputs.transactionCategory ?? 0;
  const promptWidgetRules: Array<[string, RegExp]> = [
    ['balance', /\bbalances?\b|\baccounts?\b/],
    ['transactions', /\btransactions?\b|\bpurchases?\b|\bmerchant activity\b/],
    ['cards', /\bcards?\b|\bdebit card\b|\bcredit card\b/],
    ['spending', /\bspending\b|\bexpenses?\b|\bspend categories\b/],
    ['cashflow', /cash[ -]?flow|\bforecast\b|\bmonthly budget\b/],
    ['debtPlan', /\bdebt\b|\bpayoff\b|\bloan balance\b|\binterest saved\b/],
    ['eligibility', /\beligib|\baffordability\b|\bborrow|\bqualify\b/],
    ['emi', /\bemi\b|monthly repayment|loan payment estimate/],
    ['savingsGoal', /savings goal|save toward|save for|goal amount/],
    ['fd', /fixed deposit|\bFD\b|maturity estimate/],
    ['kyc', /\bKYC\b|identity verification/],
    ['disputes', /\bdisputes?\b|chargeback|transaction fraud/],
  ];
  const requestedWidgets = promptWidgetRules.filter(([, pattern]) => pattern.test(prompt)).map(([widget]) => widget);
  const defaultWidgets: Record<BankingDashboardScenario, string[]> = {
    'financial-health': ['balance', 'cashflow', 'debtPlan'],
    'credit-readiness': ['cards', 'eligibility'],
    'savings-plan': ['balance', 'savingsGoal', 'spending'],
    'card-activity': ['cards', 'transactions', 'disputes'],
  };
  const widgetTypes = requestedWidgets.length ? requestedWidgets : defaultWidgets[scenario];
  const widgets = widgetTypes.map(widget => {
    switch (widget) {
      case 'balance': return { widget, ...getBalance() };
      case 'transactions': return { widget, ...getTransactions(limit, categoryIndex ? transactionCategories[categoryIndex - 1] : undefined) };
      case 'cards': return { widget, cards: demoCustomer.cards };
      case 'spending': return { widget, ...spendingInsights() };
      case 'cashflow': return { widget, ...projectCashFlow(inputs.monthlyIncome ?? 85000, inputs.fixedExpenses ?? 30000, inputs.variableBudget ?? 26000, inputs.months ?? 6, inputs.startingBalance ?? getBalance().totalBalance), scenarioNote: 'Uses the editable monthly income and expense assumptions above.' };
      case 'debtPlan': return { widget, ...compareDebtPayoff(loan.principalOutstanding, loan.rate, loan.emi, inputs.extraPayment ?? 3000), scenarioNote: 'Compares the sample loan payment with your extra monthly payment.' };
      case 'eligibility': return { widget, ...loanEligibility(inputs.monthlyIncome ?? 85000, inputs.existingEmi ?? loan.emi, inputs.requestedAmount ?? 500000, inputs.months ?? 36, inputs.annualRate ?? 12), scenarioNote: 'Uses editable sample assumptions and a hypothetical loan.' };
      case 'emi': return { widget, ...calculateEmi(500000, 10.5, 36), scenarioNote: 'Illustrative loan estimate from sample assumptions.' };
      case 'savingsGoal': return { widget, ...planSavingsGoal(inputs.goalAmount ?? 300000, inputs.currentSavings ?? demoCustomer.accounts[0].balance, inputs.months ?? 18, inputs.annualRate ?? 4), scenarioNote: 'Uses the goal, timeline, and assumed return entered above.' };
      case 'fd': return { widget, ...calculateFd(100000, 7.1, 24), scenarioNote: 'Example fixed deposit estimate; not a product offer.' };
      case 'kyc': return { widget, ...demoCustomer.kyc };
      case 'disputes': return { widget, disputes: demoCustomer.disputes };
      default: return null;
    }
  }).filter(Boolean);
  const titles: Record<BankingDashboardScenario, string> = {
    'financial-health': 'Financial health review',
    'credit-readiness': 'Credit readiness review',
    'savings-plan': 'Savings plan review',
    'card-activity': 'Card activity review',
  };
  return { widget: 'dashboard', scenario, title: titles[scenario], prompt, inputs, widgets };
}