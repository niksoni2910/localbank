import type { ChatMessage, Widget } from '../shared/contracts.js';
import type { ModelMessage } from './llm.js';

function formatInr(amount: unknown) {
  const num = Number(amount);
  return Number.isFinite(num) ? `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : String(amount ?? '');
}

export function summarizeWidgetForHistory(widget: Record<string, unknown>): string {
  switch (widget.widget) {
    case 'dashboard': {
      const inner = Array.isArray(widget.widgets)
        ? widget.widgets.map(item => summarizeWidgetForHistory(item as Record<string, unknown>)).join(', ')
        : '';
      return `dashboard(${widget.scenario ?? 'briefing'}, customerId=${widget.customerId ?? 'n/a'}, inputs=${JSON.stringify(widget.inputs ?? {})}, cards=[${inner}])`;
    }
    case 'portfolio':
      return `portfolio(branches=${widget.totalBranches ?? 6}, customers=${widget.totalCustomers ?? 0}, accounts=${widget.totalAccounts ?? 0}, aum=${formatInr(widget.totalAum)}, deposits=${formatInr(widget.totalDeposits)}, loans=${formatInr(widget.totalLoanBook)}, openDisputes=${widget.openDisputes ?? 0}, kycAction=${widget.kycActionNeeded ?? 0})`;
    case 'branches':
      return `branches(scope=${widget.scope ?? 'all'}, branches=${widget.branchCount ?? 0}, customers=${widget.totalCustomers ?? 0}, accounts=${widget.totalAccounts ?? 0})`;
    case 'customers': {
      const ids = Array.isArray(widget.customers)
        ? (widget.customers as Record<string, unknown>[]).map(c => `${c.customerId}:${c.customerName}`).join(',')
        : '';
      return `customers(count=${widget.count ?? 0}, list=[${ids}])`;
    }
    case 'customer360':
      return `customer360(${widget.customerId}:${widget.customerName}, segment=${widget.segment}, deposits=${formatInr(widget.totalBalance)}, loans=${formatInr(widget.totalLoanOutstanding)}, foir=${widget.foirPercent}%, utilization=${widget.creditUtilizationPercent}%, flags=${JSON.stringify(widget.riskFlags ?? [])})`;
    case 'insights':
      return `insights(scope=${widget.scope}, riskAlerts=${Array.isArray(widget.riskAlerts) ? widget.riskAlerts.length : 0}, growthOpps=${Array.isArray(widget.growthOpportunities) ? widget.growthOpportunities.length : 0})`;
    case 'risk':
      return `risk(flagged=${widget.flaggedCount ?? 0}/${widget.totalCustomers ?? 0}, foirThreshold=${widget.foirThreshold}%, utilThreshold=${widget.utilizationThreshold}%)`;
    case 'penetration':
      return `penetration(scope=${widget.scope ?? 'portfolio'}, avgProducts=${widget.avgProductsPerCustomer ?? 0})`;
    case 'regions':
      return `regions(cities=${widget.totalCities ?? 0}, topCity=${widget.topCityByAum ?? 'n/a'})`;
    case 'liquidity':
      return `liquidity(ldr=${widget.loanToDepositRatioPercent ?? 0}%, maturingSoon=${widget.maturingSoonCount ?? 0}, sweepCandidates=${Array.isArray(widget.idleCashCandidates) ? widget.idleCashCandidates.length : 0})`;
    case 'retention':
      return `retention(avgEngagement=${widget.avgEngagementScore ?? 0}, highRisk=${widget.highRiskCount ?? 0}, watchlist=${widget.watchlistCount ?? 0})`;
    case 'balance':
      return `balance(customer=${widget.customerId ?? 'n/a'}, total=${formatInr(widget.totalBalance)})`;
    case 'transactions':
      return `transactions(scope=${widget.scope ?? 'all'}, shown=${Array.isArray(widget.transactions) ? widget.transactions.length : 0}, totalMatching=${widget.count ?? '?'})`;
    case 'cards':
      return `cards(customer=${widget.customerId ?? 'n/a'}, count=${Array.isArray(widget.cards) ? widget.cards.length : 0})`;
    case 'spending':
      return `spending(scope=${widget.scope ?? 'portfolio'}, total=${formatInr(widget.total)}, top=${widget.topCategory ?? 'n/a'})`;
    case 'fd':
      return `fd(principal=${formatInr(widget.principal)}, rate=${widget.annualRate}%, months=${widget.months}, maturity=${formatInr(widget.maturityAmount)})`;
    case 'fds':
      return `fds(customer=${widget.customerId ?? 'n/a'}, count=${Array.isArray(widget.fixedDeposits) ? widget.fixedDeposits.length : 0}, totalPrincipal=${formatInr(widget.totalPrincipal)})`;
    case 'emi':
      return `emi(principal=${formatInr(widget.principal)}, rate=${widget.annualRate}%, months=${widget.months}, monthlyEmi=${formatInr(widget.monthlyEmi)})`;
    case 'loans':
      return `loans(customer=${widget.customerId ?? 'n/a'}, count=${Array.isArray(widget.loans) ? widget.loans.length : 0}, totalOutstanding=${formatInr(widget.totalOutstanding)}, totalMonthlyEmi=${formatInr(widget.totalMonthlyEmi)})`;
    case 'eligibility':
      return `eligibility(requested=${formatInr(widget.requestedAmount)}, emi=${formatInr(widget.estimatedEmi)}, foir=${widget.estimatedFoirPercent}%, indicative=${widget.indicative})`;
    case 'cashflow':
      return `cashflow(months=${widget.months}, netMonthly=${formatInr(widget.netMonthlyCashFlow)}, endingBalance=${formatInr(widget.endingBalance)})`;
    case 'debtPlan':
      return `debtPlan(extraPayment=${formatInr(widget.extraPayment)}, interestSaved=${formatInr(widget.interestSaved)}, monthsSaved=${widget.monthsSaved ?? 'n/a'})`;
    case 'savingsGoal':
      return `savingsGoal(goal=${formatInr(widget.goalAmount)}, current=${formatInr(widget.currentSavings)}, months=${widget.months}, rate=${widget.annualRate}%, monthlyContribution=${formatInr(widget.monthlyContribution)})`;
    case 'kyc':
      return `kyc(customer=${widget.customerId ?? 'n/a'}, status=${widget.status ?? 'unknown'})`;
    case 'disputes':
      return `disputes(count=${Array.isArray(widget.disputes) ? widget.disputes.length : 0})`;
    default:
      return String(widget.widget ?? 'card');
  }
}

export function toModelMessages(messages: ChatMessage[]): ModelMessage[] {
  return messages.map(message => {
    if (message.role !== 'assistant') return { role: message.role, content: message.content };
    const widgets = message.widgets?.length ? message.widgets : (message.widget ? [message.widget] : []);
    if (!widgets.length) return { role: message.role, content: message.content };
    const summary = widgets.map(summarizeWidgetForHistory).join('; ');
    return { role: message.role, content: `${message.content}\n[Displayed cards: ${summary}]` };
  });
}

export function summarizeWidgetsForUser(widgets: Widget[]): string {
  if (!widgets.length) return 'Loaded the requested synthetic customer analytics.';
  const parts = widgets.map(widget => {
    switch (widget.widget) {
      case 'dashboard': return `Prepared ${String(widget.title ?? 'the analyst briefing')}.`;
      case 'portfolio': return `Portfolio spans ${widget.totalBranches ?? 6} branches, ${widget.totalCustomers} synthetic customers, and ${widget.totalAccounts ?? 0} accounts with ${formatInr(widget.totalAum)} total AUM.`;
      case 'branches': return `Loaded ${widget.branchCount ?? 0} bank branch(es) covering ${widget.totalCustomers ?? 0} customers and ${widget.totalAccounts ?? 0} accounts (${widget.scope}).`;
      case 'customers': return `Found ${widget.count ?? 0} matching customer(s).`;
      case 'customer360': return `Loaded Customer 360 profile for ${widget.customerName} (${widget.customerId}).`;
      case 'insights': return `Identified ${Array.isArray(widget.riskAlerts) ? widget.riskAlerts.length : 0} risk alert(s) and ${Array.isArray(widget.growthOpportunities) ? widget.growthOpportunities.length : 0} growth lead(s) for ${widget.scope}.`;
      case 'risk': return `Flagged ${widget.flaggedCount} of ${widget.totalCustomers} customers under current risk and compliance thresholds.`;
      case 'penetration': return `Average product depth is ${widget.avgProductsPerCustomer} products per customer across ${widget.totalCustomers} customers (${widget.scope}).`;
      case 'regions': return `Loaded regional performance across ${widget.totalCities} cities (top city by AUM: ${widget.topCityByAum}).`;
      case 'liquidity': return `Portfolio LDR is ${widget.loanToDepositRatioPercent}% with ${widget.maturingSoonCount} maturing FD(s) and ${Array.isArray(widget.idleCashCandidates) ? widget.idleCashCandidates.length : 0} idle-cash sweep candidate(s).`;
      case 'retention': return `Average engagement is ${widget.avgEngagementScore}/100 (${widget.highRiskCount} high-risk, ${widget.watchlistCount} watchlist, ${widget.healthyCount} healthy).`;
      case 'balance': return `${widget.customerName ?? 'Customer'} holds ${formatInr(widget.totalBalance)} across ${Array.isArray(widget.accounts) ? widget.accounts.length : 0} deposit accounts.`;
      case 'transactions': return `Showing ${Array.isArray(widget.transactions) ? widget.transactions.length : 0} matching transactions (${widget.scope ?? 'all customers'}).`;
      case 'cards': return `Loaded ${Array.isArray(widget.cards) ? widget.cards.length : 0} cards for ${widget.customerName ?? 'customer'}.`;
      case 'spending': return `Total spend for ${widget.scope ?? 'portfolio'} is ${formatInr(widget.total)} (top category: ${widget.topCategory}).`;
      case 'fd': return `Estimated FD maturity is ${formatInr(widget.maturityAmount)} on ${formatInr(widget.principal)} over ${widget.months} months.`;
      case 'fds': return `${widget.customerName ?? 'Customer'} has ${Array.isArray(widget.fixedDeposits) ? widget.fixedDeposits.length : 0} fixed deposit(s) totaling ${formatInr(widget.totalPrincipal)}.`;
      case 'emi': return `Estimated monthly EMI is ${formatInr(widget.monthlyEmi)} for ${formatInr(widget.principal)} over ${widget.months} months.`;
      case 'loans': return `${widget.customerName ?? 'Customer'} has ${Array.isArray(widget.loans) ? widget.loans.length : 0} loan(s) totaling ${formatInr(widget.totalOutstanding)} (${formatInr(widget.totalMonthlyEmi)}/mo EMI).`;
      case 'eligibility': return `Simulated EMI is ${formatInr(widget.estimatedEmi)} (${widget.estimatedFoirPercent}% FOIR).`;
      case 'cashflow': return `Projected net monthly cash flow is ${formatInr(widget.netMonthlyCashFlow)} over ${widget.months} months.`;
      case 'debtPlan': return `Adding ${formatInr(widget.extraPayment)}/month saves an estimated ${formatInr(widget.interestSaved)} in interest.`;
      case 'savingsGoal': return `Required monthly contribution is ${formatInr(widget.monthlyContribution)} for ${widget.months} months.`;
      case 'kyc': return `KYC status for ${widget.customerName ?? 'customer'} is ${widget.status}.`;
      case 'disputes': return `Found ${Array.isArray(widget.disputes) ? widget.disputes.length : 0} open dispute case(s).`;
      default: return 'Loaded the requested analytics card.';
    }
  });
  return parts.join(' ');
}
