export function calculateFd(principal: number, annualRate: number, months: number) {
  const maturity = principal * Math.pow(1 + annualRate / 400, 4 * months / 12);
  return { principal, annualRate, months, maturityAmount: Math.round(maturity * 100) / 100, interestEarned: Math.round((maturity - principal) * 100) / 100, calculation: 'Illustrative quarterly compounding; verify bank product terms.' };
}

export function calculateEmi(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  return { principal, annualRate, months, monthlyEmi: Math.round(emi * 100) / 100, totalPayable: Math.round(emi * months * 100) / 100, totalInterest: Math.round((emi * months - principal) * 100) / 100 };
}

export function loanEligibility(monthlyIncome: number, existingEmi: number, requestedAmount: number, months: number, annualRate = 12) {
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? requestedAmount / months : requestedAmount * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const foir = ((existingEmi + emi) / monthlyIncome) * 100;
  return { monthlyIncome, existingEmi, requestedAmount, months, estimatedEmi: Math.round(emi), estimatedFoirPercent: Math.round(foir * 10) / 10, indicative: foir <= 50, note: 'Indicative underwriting simulation only. Formal credit approval requires policy checks.' };
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
    note: 'Illustrative cash-flow stress simulation from current income and spending assumptions.',
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
    note: 'Illustrative amortization comparison for customer advisory.',
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
    note: 'Illustrative savings projection; returns are not guaranteed.',
  };
}
