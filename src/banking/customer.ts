import { syntheticCustomers } from './data.js';
import { computeCustomerMetrics, resolveBranch, resolveCustomer } from './metrics.js';
import type { CustomerSegment } from './types.js';

export function getCustomerProfile(customerIdOrName?: string) {
  const customer = resolveCustomer(customerIdOrName);
  const branch = resolveBranch(customer.branchId);
  const metrics = computeCustomerMetrics(customer);
  return {
    customerId: customer.customerId,
    customerName: customer.customerName,
    branchId: customer.branchId,
    branchName: branch.branchName,
    ifsc: branch.ifsc,
    branchManager: branch.manager,
    city: customer.city,
    segment: customer.segment,
    relationshipYears: customer.relationshipYears,
    monthlyIncome: customer.monthlyIncome,
    engagementScore: customer.engagementScore,
    accountCount: customer.accounts.length,
    kyc: customer.kyc,
    accounts: customer.accounts,
    cards: customer.cards,
    fixedDeposits: customer.fd,
    loans: customer.loans,
    disputes: customer.disputes,
    recentTransactions: customer.transactions.slice(0, 6),
    ...metrics,
  };
}

export function getBalance(customerId?: string) {
  const customer = resolveCustomer(customerId);
  const branch = resolveBranch(customer.branchId);
  const total = customer.accounts.reduce((sum, a) => sum + a.balance, 0);
  return {
    customerId: customer.customerId,
    customerName: customer.customerName,
    branchId: customer.branchId,
    branchName: branch.branchName,
    accountCount: customer.accounts.length,
    accounts: customer.accounts,
    totalBalance: total,
    currency: 'INR',
  };
}

export function getFixedDeposits(customerId?: string) {
  const customer = resolveCustomer(customerId);
  const totalPrincipal = customer.fd.reduce((sum, item) => sum + item.principal, 0);
  const totalMaturity = customer.fd.reduce((sum, item) => sum + item.maturityAmount, 0);
  return { customerId: customer.customerId, customerName: customer.customerName, fixedDeposits: customer.fd, totalPrincipal, totalMaturity };
}

export function getLoans(customerId?: string) {
  const customer = resolveCustomer(customerId);
  const totalOutstanding = customer.loans.reduce((sum, item) => sum + item.principalOutstanding, 0);
  const totalMonthlyEmi = customer.loans.reduce((sum, item) => sum + item.emi, 0);
  return { customerId: customer.customerId, customerName: customer.customerName, loans: customer.loans, totalOutstanding, totalMonthlyEmi };
}

export function getTransactions(limit = 10, category?: string, customerId?: string, status?: 'Completed' | 'Disputed', minAmount?: number, branchId?: string) {
  const targetCustomer = customerId ? resolveCustomer(customerId) : undefined;
  const targetBranch = branchId ? resolveBranch(branchId) : undefined;
  const cohort = targetCustomer
    ? [targetCustomer]
    : (targetBranch ? syntheticCustomers.filter(c => c.branchId === targetBranch.branchId) : syntheticCustomers);

  const source = cohort.flatMap(c =>
    c.transactions.map(t => ({ ...t, customerId: c.customerId, customerName: c.customerName, branchId: c.branchId })),
  );

  const rows = source
    .filter(t => !category || t.category.toLowerCase() === category.toLowerCase())
    .filter(t => !status || t.status === status)
    .filter(t => minAmount === undefined || Math.abs(t.amount) >= minAmount)
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

  return {
    scope: targetCustomer ? `${targetCustomer.customerName} (${targetCustomer.customerId})` : (targetBranch ? targetBranch.branchName : 'All branches & customers'),
    transactions: rows.slice(0, Math.max(1, Math.min(limit, 50))),
    count: rows.length,
  };
}

export function spendingInsights(customerId?: string, segment?: CustomerSegment) {
  const target = customerId ? resolveCustomer(customerId) : undefined;
  const cohort = target
    ? [target]
    : (segment ? syntheticCustomers.filter(c => c.segment === segment) : syntheticCustomers);

  const totals = new Map<string, number>();
  for (const customer of cohort) {
    for (const entry of customer.spending) {
      totals.set(entry.category, (totals.get(entry.category) ?? 0) + entry.amount);
    }
  }
  const spending = [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
  const total = spending.reduce((s, c) => s + c.amount, 0);
  const largest = spending[0] ?? { category: 'None', amount: 0 };
  const totalIncome = cohort.reduce((s, c) => s + c.monthlyIncome, 0);
  const savingsRateEstimate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - total) / totalIncome) * 100)) : 0;

  return {
    scope: target ? `${target.customerName} (${target.customerId})` : (segment ?? 'Entire portfolio'),
    spending,
    total,
    topCategory: largest.category,
    topCategoryAmount: largest.amount,
    savingsRateEstimate,
    note: 'Aggregated from synthetic customer spending data.',
  };
}
