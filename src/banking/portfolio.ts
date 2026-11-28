import { syntheticBranches, syntheticCustomers } from './data.js';
import { computeCustomerMetrics, resolveBranch } from './metrics.js';
import type { CustomerRecord, CustomerSegment, KycStatus } from './types.js';

export function getBranchOverview(branchIdOrName?: string) {
  const targetBranches = branchIdOrName ? [resolveBranch(branchIdOrName)] : syntheticBranches;
  const branches = targetBranches.map(branch => {
    const members = syntheticCustomers.filter(c => c.branchId === branch.branchId);
    const enriched = members.map(c => ({ customer: c, metrics: computeCustomerMetrics(c) }));
    const totalDeposits = enriched.reduce((s, x) => s + x.metrics.totalBalance, 0);
    const totalFdBook = enriched.reduce((s, x) => s + x.metrics.totalFdPrincipal, 0);
    const totalLoanBook = enriched.reduce((s, x) => s + x.metrics.totalLoanOutstanding, 0);
    const accountCount = members.reduce((s, c) => s + c.accounts.length, 0);
    const transactionCount = members.reduce((s, c) => s + c.transactions.length, 0);
    const openDisputes = members.reduce((s, c) => s + c.disputes.length, 0);
    const kycActionNeeded = members.filter(c => c.kyc.status !== 'Verified').length;

    return {
      ...branch,
      customerCount: members.length,
      accountCount,
      transactionCount,
      totalDeposits,
      totalFdBook,
      totalAum: totalDeposits + totalFdBook,
      totalLoanBook,
      openDisputes,
      kycActionNeeded,
      customers: enriched.map(({ customer, metrics }) => ({
        customerId: customer.customerId,
        customerName: customer.customerName,
        segment: customer.segment,
        accountCount: customer.accounts.length,
        totalBalance: metrics.totalBalance,
        foirPercent: metrics.foirPercent,
        kycStatus: customer.kyc.status,
      })),
    };
  }).sort((a, b) => b.totalAum - a.totalAum);

  return {
    scope: branchIdOrName ? branches[0].branchName : 'All branches',
    branchCount: branches.length,
    totalCustomers: branches.reduce((s, b) => s + b.customerCount, 0),
    totalAccounts: branches.reduce((s, b) => s + b.accountCount, 0),
    branches,
  };
}

export function getPortfolioOverview() {
  const summaries = syntheticCustomers.map(c => ({ customer: c, metrics: computeCustomerMetrics(c) }));
  const totalCustomers = summaries.length;
  const totalAccounts = syntheticCustomers.reduce((s, c) => s + c.accounts.length, 0);
  const totalTransactions = syntheticCustomers.reduce((s, c) => s + c.transactions.length, 0);
  const totalDeposits = summaries.reduce((s, x) => s + x.metrics.totalBalance, 0);
  const totalFdBook = summaries.reduce((s, x) => s + x.metrics.totalFdPrincipal, 0);
  const totalLoanBook = summaries.reduce((s, x) => s + x.metrics.totalLoanOutstanding, 0);
  const openDisputes = summaries.reduce((s, x) => s + x.customer.disputes.length, 0);
  const kycActionNeeded = summaries.filter(x => x.customer.kyc.status !== 'Verified').length;
  const avgFoirPercent = Math.round(
    (summaries.reduce((s, x) => s + x.metrics.foirPercent, 0) / totalCustomers) * 10,
  ) / 10;

  const bySegment = new Map<CustomerSegment, { count: number; deposits: number; fdBook: number; loanBook: number; income: number }>();
  for (const { customer, metrics } of summaries) {
    const entry = bySegment.get(customer.segment) ?? { count: 0, deposits: 0, fdBook: 0, loanBook: 0, income: 0 };
    entry.count += 1;
    entry.deposits += metrics.totalBalance;
    entry.fdBook += metrics.totalFdPrincipal;
    entry.loanBook += metrics.totalLoanOutstanding;
    entry.income += customer.monthlyIncome;
    bySegment.set(customer.segment, entry);
  }

  const segments = [...bySegment.entries()].map(([segment, agg]) => ({
    segment,
    customers: agg.count,
    totalDeposits: agg.deposits,
    totalFdBook: agg.fdBook,
    totalLoanBook: agg.loanBook,
    avgMonthlyIncome: Math.round(agg.income / agg.count),
  }));

  return {
    totalBranches: syntheticBranches.length,
    totalCustomers,
    totalAccounts,
    totalTransactions,
    totalDeposits,
    totalFdBook,
    totalAum: totalDeposits + totalFdBook,
    totalLoanBook,
    openDisputes,
    kycActionNeeded,
    avgFoirPercent,
    segments,
    note: 'Aggregated across synthetic multi-branch demo portfolio.',
  };
}

export function searchCustomers(filters: {
  query?: string;
  branchId?: string;
  segment?: CustomerSegment;
  kycStatus?: KycStatus;
  minBalance?: number;
  hasOpenDisputes?: boolean;
  riskFlag?: 'high-foir' | 'high-utilization' | 'kyc-pending' | 'open-dispute' | 'churn-risk';
} = {}) {
  const branchFilter = filters.branchId ? resolveBranch(filters.branchId).branchId : undefined;
  const results = syntheticCustomers
    .map(customer => ({ customer, metrics: computeCustomerMetrics(customer) }))
    .filter(({ customer, metrics }) => {
      if (branchFilter && customer.branchId !== branchFilter) return false;
      if (filters.query) {
        const q = filters.query.trim().toLowerCase();
        const hay = `${customer.customerId} ${customer.customerName} ${customer.branchId} ${customer.city} ${customer.segment}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.segment && customer.segment !== filters.segment) return false;
      if (filters.kycStatus && customer.kyc.status !== filters.kycStatus) return false;
      if (filters.minBalance !== undefined && metrics.totalBalance < filters.minBalance) return false;
      if (filters.hasOpenDisputes === true && customer.disputes.length === 0) return false;
      if (filters.hasOpenDisputes === false && customer.disputes.length > 0) return false;
      if (filters.riskFlag === 'high-foir' && metrics.foirPercent < 45) return false;
      if (filters.riskFlag === 'high-utilization' && metrics.creditUtilizationPercent < 70) return false;
      if (filters.riskFlag === 'kyc-pending' && customer.kyc.status === 'Verified') return false;
      if (filters.riskFlag === 'open-dispute' && customer.disputes.length === 0) return false;
      if (filters.riskFlag === 'churn-risk' && customer.engagementScore >= 50 && metrics.totalBalance >= 50000) return false;
      return true;
    })
    .map(({ customer, metrics }) => ({
      customerId: customer.customerId,
      customerName: customer.customerName,
      branchId: customer.branchId,
      city: customer.city,
      segment: customer.segment,
      accountCount: customer.accounts.length,
      monthlyIncome: customer.monthlyIncome,
      totalBalance: metrics.totalBalance,
      totalFdPrincipal: metrics.totalFdPrincipal,
      totalLoanOutstanding: metrics.totalLoanOutstanding,
      foirPercent: metrics.foirPercent,
      creditUtilizationPercent: metrics.creditUtilizationPercent,
      kycStatus: customer.kyc.status,
      openDisputes: customer.disputes.length,
      engagementScore: customer.engagementScore,
      riskFlags: metrics.riskFlags,
      opportunities: metrics.opportunities,
    }));

  return { customers: results, count: results.length };
}

export function getSegmentInsights(segment?: CustomerSegment) {
  const cohort = segment ? syntheticCustomers.filter(c => c.segment === segment) : syntheticCustomers;
  const rows = cohort.map(c => ({ customer: c, metrics: computeCustomerMetrics(c) }));

  const riskAlerts = rows
    .filter(r => r.metrics.riskFlags.length > 0)
    .map(r => ({
      customerId: r.customer.customerId,
      customerName: r.customer.customerName,
      branchId: r.customer.branchId,
      segment: r.customer.segment,
      flags: r.metrics.riskFlags,
    }));

  const growthOpportunities = rows
    .filter(r => r.metrics.opportunities.length > 0)
    .map(r => ({
      customerId: r.customer.customerId,
      customerName: r.customer.customerName,
      branchId: r.customer.branchId,
      segment: r.customer.segment,
      totalBalance: r.metrics.totalBalance,
      opportunities: r.metrics.opportunities,
    }));

  const categoryTotals = new Map<string, number>();
  for (const { customer } of rows) {
    for (const s of customer.spending) {
      categoryTotals.set(s.category, (categoryTotals.get(s.category) ?? 0) + s.amount);
    }
  }
  const topCategories = [...categoryTotals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  return {
    scope: segment ?? 'All segments',
    customerCount: rows.length,
    avgEngagementScore: rows.length
      ? Math.round(rows.reduce((s, r) => s + r.customer.engagementScore, 0) / rows.length)
      : 0,
    riskAlerts,
    growthOpportunities,
    topCategories,
  };
}

export function getRiskAndCompliance(foirThreshold = 45, utilizationThreshold = 70) {
  const flagged = syntheticCustomers
    .map(customer => {
      const metrics = computeCustomerMetrics(customer);
      const reasons: string[] = [];
      if (metrics.foirPercent >= foirThreshold) reasons.push(`FOIR ${metrics.foirPercent}% (>= ${foirThreshold}%)`);
      if (metrics.creditUtilizationPercent >= utilizationThreshold) reasons.push(`Card utilization ${metrics.creditUtilizationPercent}% (>= ${utilizationThreshold}%)`);
      if (customer.kyc.status !== 'Verified') reasons.push(`KYC ${customer.kyc.status}`);
      if (customer.disputes.length > 0) reasons.push(`${customer.disputes.length} open dispute(s)`);
      return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        branchId: customer.branchId,
        segment: customer.segment,
        kycStatus: customer.kyc.status,
        pendingKycItems: customer.kyc.pendingItems,
        foirPercent: metrics.foirPercent,
        creditUtilizationPercent: metrics.creditUtilizationPercent,
        openDisputes: customer.disputes,
        reasons,
      };
    })
    .filter(item => item.reasons.length > 0);

  return {
    foirThreshold,
    utilizationThreshold,
    flaggedCount: flagged.length,
    totalCustomers: syntheticCustomers.length,
    flaggedCustomers: flagged,
  };
}

export function getProductPenetration(segment?: CustomerSegment) {
  const cohort = segment ? syntheticCustomers.filter(c => c.segment === segment) : syntheticCustomers;
  const total = cohort.length;
  const pctOf = (count: number) => (total > 0 ? Math.round((count / total) * 1000) / 10 : 0);

  const depositHolders = cohort.filter(c => c.accounts.length > 0).length;
  const creditCardHolders = cohort.filter(c => c.cards.some(card => card.creditLimit != null)).length;
  const fdHolders = cohort.filter(c => c.fd.length > 0).length;
  const loanHolders = cohort.filter(c => c.loans.length > 0).length;

  const productCounts = cohort.map(c =>
    (c.accounts.length > 0 ? 1 : 0) +
    (c.cards.some(card => card.creditLimit != null) ? 1 : 0) +
    (c.fd.length > 0 ? 1 : 0) +
    (c.loans.length > 0 ? 1 : 0),
  );
  const avgProductsPerCustomer = total > 0
    ? Math.round((productCounts.reduce((s, n) => s + n, 0) / total) * 100) / 100
    : 0;

  const segmentsMap = new Map<CustomerSegment, CustomerRecord[]>();
  for (const c of cohort) {
    const list = segmentsMap.get(c.segment) ?? [];
    list.push(c);
    segmentsMap.set(c.segment, list);
  }

  const bySegment = [...segmentsMap.entries()].map(([seg, members]) => {
    const n = members.length;
    const rate = (count: number) => Math.round((count / n) * 1000) / 10;
    return {
      segment: seg,
      customers: n,
      creditCardRate: rate(members.filter(m => m.cards.some(card => card.creditLimit != null)).length),
      fdRate: rate(members.filter(m => m.fd.length > 0).length),
      loanRate: rate(members.filter(m => m.loans.length > 0).length),
    };
  });

  return {
    scope: segment ?? 'Entire portfolio',
    totalCustomers: total,
    avgProductsPerCustomer,
    products: [
      { product: 'Deposit Accounts', holders: depositHolders, penetrationPercent: pctOf(depositHolders) },
      { product: 'Credit Cards', holders: creditCardHolders, penetrationPercent: pctOf(creditCardHolders) },
      { product: 'Loans', holders: loanHolders, penetrationPercent: pctOf(loanHolders) },
      { product: 'Fixed Deposits', holders: fdHolders, penetrationPercent: pctOf(fdHolders) },
    ],
    bySegment,
  };
}

export function getRegionalBreakdown() {
  const byCity = new Map<string, {
    customers: number;
    deposits: number;
    fdBook: number;
    loanBook: number;
    engagementSum: number;
    alerts: number;
  }>();

  for (const c of syntheticCustomers) {
    const m = computeCustomerMetrics(c);
    const entry = byCity.get(c.city) ?? { customers: 0, deposits: 0, fdBook: 0, loanBook: 0, engagementSum: 0, alerts: 0 };
    entry.customers += 1;
    entry.deposits += m.totalBalance;
    entry.fdBook += m.totalFdPrincipal;
    entry.loanBook += m.totalLoanOutstanding;
    entry.engagementSum += c.engagementScore;
    if (m.riskFlags.length > 0) entry.alerts += 1;
    byCity.set(c.city, entry);
  }

  const regions = [...byCity.entries()]
    .map(([city, agg]) => ({
      city,
      customers: agg.customers,
      totalDeposits: agg.deposits,
      totalFdBook: agg.fdBook,
      totalAum: agg.deposits + agg.fdBook,
      totalLoanBook: agg.loanBook,
      avgEngagement: Math.round(agg.engagementSum / agg.customers),
      flaggedCustomers: agg.alerts,
    }))
    .sort((a, b) => b.totalAum - a.totalAum);

  return {
    totalCities: regions.length,
    topCityByAum: regions[0]?.city ?? '—',
    regions,
  };
}

export function getLiquidityAndMaturities() {
  const metricsByCustomer = syntheticCustomers.map(c => ({ customer: c, metrics: computeCustomerMetrics(c) }));
  const totalLiquidDeposits = metricsByCustomer.reduce((s, x) => s + x.metrics.totalBalance, 0);
  const totalFdBook = metricsByCustomer.reduce((s, x) => s + x.metrics.totalFdPrincipal, 0);
  const totalLoans = metricsByCustomer.reduce((s, x) => s + x.metrics.totalLoanOutstanding, 0);
  const loanToDepositRatioPercent = totalLiquidDeposits > 0
    ? Math.round((totalLoans / (totalLiquidDeposits + totalFdBook)) * 1000) / 10
    : 0;

  const fdMaturities = syntheticCustomers
    .flatMap(c => c.fd.map(f => ({
      customerId: c.customerId,
      customerName: c.customerName,
      branchId: c.branchId,
      segment: c.segment,
      fdId: f.id,
      principal: f.principal,
      rate: f.rate,
      maturityAmount: f.maturityAmount,
      maturityDate: f.maturityDate,
      status: f.status,
    })))
    .sort((a, b) => a.maturityDate.localeCompare(b.maturityDate));

  const idleCashCandidates = metricsByCustomer
    .filter(x => x.metrics.totalBalance >= 300000 && x.metrics.totalFdPrincipal < x.metrics.totalBalance * 0.6)
    .map(x => {
      const suggestedSweep = Math.round(x.metrics.totalBalance * 0.5);
      return {
        customerId: x.customer.customerId,
        customerName: x.customer.customerName,
        branchId: x.customer.branchId,
        segment: x.customer.segment,
        liquidBalance: x.metrics.totalBalance,
        currentFdPrincipal: x.metrics.totalFdPrincipal,
        suggestedFdSweep: suggestedSweep,
        estimatedAnnualInterestGain: Math.round(suggestedSweep * 0.0425),
      };
    })
    .sort((a, b) => b.liquidBalance - a.liquidBalance);

  const lowBufferCustomers = metricsByCustomer
    .filter(x => x.metrics.totalBalance < 60000)
    .map(x => ({
      customerId: x.customer.customerId,
      customerName: x.customer.customerName,
      branchId: x.customer.branchId,
      segment: x.customer.segment,
      liquidBalance: x.metrics.totalBalance,
      monthlyBurn: x.customer.monthlyFixedExpenses + x.customer.monthlyVariableSpend,
    }));

  return {
    totalLiquidDeposits,
    totalFdBook,
    loanToDepositRatioPercent,
    maturingSoonCount: fdMaturities.filter(f => f.status === 'Maturing Soon').length,
    fdMaturities,
    idleCashCandidates,
    lowBufferCustomers,
  };
}

export function getChurnAndRetention() {
  const evaluated = syntheticCustomers.map(c => {
    const m = computeCustomerMetrics(c);
    const drivers: string[] = [];
    if (c.engagementScore < 50) drivers.push(`Low engagement (${c.engagementScore}/100)`);
    else if (c.engagementScore < 70) drivers.push(`Moderate engagement (${c.engagementScore}/100)`);
    if (m.totalBalance < 50000) drivers.push('Low liquidity buffer');
    if (m.creditUtilizationPercent >= 75) drivers.push(`High card utilization (${m.creditUtilizationPercent}%)`);
    if (m.foirPercent >= 45) drivers.push(`High EMI burden (${m.foirPercent}% FOIR)`);
    if (c.kyc.status !== 'Verified') drivers.push(`KYC ${c.kyc.status}`);
    if (c.disputes.length > 0) drivers.push(`${c.disputes.length} open dispute(s)`);

    const tier: 'High Risk' | 'Watchlist' | 'Healthy' =
      (c.engagementScore < 50 || (c.disputes.length > 0 && m.creditUtilizationPercent >= 75))
        ? 'High Risk'
        : (c.engagementScore < 70 || c.kyc.status !== 'Verified' || c.disputes.length > 0)
          ? 'Watchlist'
          : 'Healthy';

    const recommendedAction =
      tier === 'High Risk'
        ? (c.disputes.length > 0 ? 'Expedite dispute resolution & RM check-in' : 'Debt consolidation / card limit counseling')
        : tier === 'Watchlist'
          ? (c.kyc.status !== 'Verified' ? 'Trigger assisted Re-KYC outreach' : 'Proactive RM touchpoint & product review')
          : (m.opportunities[0] ?? 'Maintain relationship & periodic review');

    return {
      customerId: c.customerId,
      customerName: c.customerName,
      branchId: c.branchId,
      segment: c.segment,
      engagementScore: c.engagementScore,
      totalAum: m.totalBalance + m.totalFdPrincipal,
      tier,
      drivers: drivers.length ? drivers : ['Strong engagement & clean profile'],
      recommendedAction,
    };
  }).sort((a, b) => a.engagementScore - b.engagementScore);

  const highRiskCount = evaluated.filter(e => e.tier === 'High Risk').length;
  const watchlistCount = evaluated.filter(e => e.tier === 'Watchlist').length;
  const healthyCount = evaluated.filter(e => e.tier === 'Healthy').length;
  const avgEngagementScore = evaluated.length
    ? Math.round(evaluated.reduce((s, e) => s + e.engagementScore, 0) / evaluated.length)
    : 0;

  return {
    totalCustomers: evaluated.length,
    avgEngagementScore,
    highRiskCount,
    watchlistCount,
    healthyCount,
    customers: evaluated,
  };
}
