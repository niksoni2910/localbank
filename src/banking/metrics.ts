import { syntheticBranches, syntheticCustomers } from './data.js';
import type { BankBranch, CustomerRecord } from './types.js';

export function resolveBranch(branchIdOrName: string): BankBranch {
  const needle = branchIdOrName.trim().toLowerCase();
  const match = syntheticBranches.find(b =>
    b.branchId.toLowerCase() === needle ||
    b.branchName.toLowerCase().includes(needle) ||
    b.city.toLowerCase() === needle ||
    b.ifsc.toLowerCase() === needle,
  );
  if (!match) {
    throw new Error(`Branch "${branchIdOrName}" was not found. Available branches: ${syntheticBranches.map(b => `${b.branchId} (${b.branchName})`).join(', ')}.`);
  }
  return match;
}

export function resolveCustomer(customerIdOrName?: string): CustomerRecord {
  if (!customerIdOrName) return syntheticCustomers[0];
  const needle = customerIdOrName.trim().toLowerCase();
  const match = syntheticCustomers.find(c =>
    c.customerId.toLowerCase() === needle ||
    c.customerName.toLowerCase().includes(needle),
  );
  if (!match) {
    throw new Error(`Customer "${customerIdOrName}" was not found. Available IDs: ${syntheticCustomers.map(c => `${c.customerId} (${c.customerName})`).join(', ')}.`);
  }
  return match;
}

export function computeCustomerMetrics(customer: CustomerRecord) {
  const totalBalance = customer.accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalFdPrincipal = customer.fd.reduce((sum, f) => sum + f.principal, 0);
  const totalLoanOutstanding = customer.loans.reduce((sum, l) => sum + l.principalOutstanding, 0);
  const totalMonthlyEmi = customer.loans.reduce((sum, l) => sum + l.emi, 0);
  const foirPercent = customer.monthlyIncome > 0
    ? Math.round((totalMonthlyEmi / customer.monthlyIncome) * 1000) / 10
    : 0;
  const creditLimit = customer.cards.reduce((sum, c) => sum + (c.creditLimit ?? 0), 0);
  const creditOutstanding = customer.cards.reduce((sum, c) => sum + (c.outstanding ?? 0), 0);
  const creditUtilizationPercent = creditLimit > 0
    ? Math.round((creditOutstanding / creditLimit) * 1000) / 10
    : 0;

  const riskFlags: string[] = [];
  if (foirPercent >= 45) riskFlags.push(`High FOIR (${foirPercent}%)`);
  if (creditUtilizationPercent >= 70) riskFlags.push(`High card utilization (${creditUtilizationPercent}%)`);
  if (customer.kyc.status !== 'Verified') riskFlags.push(`KYC ${customer.kyc.status}`);
  if (customer.disputes.length > 0) riskFlags.push(`${customer.disputes.length} open dispute(s)`);
  if (customer.engagementScore < 50 || totalBalance < 50000) riskFlags.push('Low liquidity / churn watch');

  const opportunities: string[] = [];
  if (totalBalance >= 400000 && totalFdPrincipal < totalBalance * 0.6) {
    opportunities.push('FD / wealth sweep candidate (high idle savings)');
  }
  if (customer.fd.some(f => f.status === 'Maturing Soon')) {
    opportunities.push('FD renewal outreach (maturity approaching)');
  }
  const travelOrDining = customer.spending
    .filter(s => s.category === 'Travel' || s.category === 'Dining')
    .reduce((sum, s) => sum + s.amount, 0);
  if (travelOrDining >= 18000 && !customer.cards.some(c => /travel|premier|infinia/i.test(c.name))) {
    opportunities.push('Travel/Rewards credit card upgrade');
  }
  if (customer.loans.length > 0 && foirPercent < 38 && totalBalance >= 200000) {
    opportunities.push('Pre-payment / debt optimization advisory');
  }

  return {
    totalBalance,
    totalFdPrincipal,
    totalLoanOutstanding,
    totalMonthlyEmi,
    foirPercent,
    creditLimit,
    creditOutstanding,
    creditUtilizationPercent,
    riskFlags,
    opportunities,
  };
}
