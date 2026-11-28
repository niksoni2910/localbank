import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function BankingDashboard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading analyst briefing…</p>;
  if (status === 'error') return <p>Could not load the analyst briefing.</p>;

  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number | null) => n == null ? 'Unavailable' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  const summary = (item: any) => {
    switch (item.widget) {
      case 'portfolio': return `${item.totalCustomers} customers · ${item.totalAccounts ?? 0} accounts · AUM ${money(item.totalAum)}`;
      case 'branches': return `${item.branchCount ?? 0} branches · ${item.totalCustomers ?? 0} customers · ${item.totalAccounts ?? 0} accounts`;
      case 'customer360': return `${item.customerName} (${item.customerId}) · Deposits ${money(item.totalBalance)} · FOIR ${item.foirPercent}%`;
      case 'customers': return `${item.count ?? 0} matched customers`;
      case 'insights': return `${(item.riskAlerts ?? []).length} risk alerts · ${(item.growthOpportunities ?? []).length} growth leads`;
      case 'risk': return `${item.flaggedCount ?? 0} flagged customers`;
      case 'penetration': return `${item.avgProductsPerCustomer ?? 0} avg products/customer`;
      case 'regions': return `${item.totalCities ?? 0} cities · top AUM ${item.topCityByAum}`;
      case 'liquidity': return `LDR ${item.loanToDepositRatioPercent ?? 0}% · ${item.maturingSoonCount ?? 0} maturing FD(s)`;
      case 'retention': return `Avg engagement ${item.avgEngagementScore ?? 0}/100 · ${item.highRiskCount ?? 0} high risk`;
      case 'spending': return `Total spend ${money(item.total)} · top category ${item.topCategory}`;
      case 'eligibility': return `Hypothetical EMI ${money(item.estimatedEmi)} · FOIR ${item.estimatedFoirPercent}%`;
      case 'transactions': return `${item.transactions?.length ?? 0} transactions shown`;
      case 'fd': return `Proposed FD maturity ${money(item.maturityAmount)}`;
      default: return 'Synthetic analyst view';
    }
  };

  return <article style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#183e43', background: '#f5faf8', border: '1px solid #d6e5e1', borderRadius: 12 }}>
    <h2 style={{ margin: '0 0 10px' }}>{d.title ?? 'Analyst briefing'}</h2>
    <div style={{ display: 'grid', gap: 10 }}>
      {(d.widgets ?? []).map((item: any, idx: number) => <section key={`${item.widget}-${idx}`} style={{ background: '#fff', padding: 10, borderRadius: 8 }}>
        <small style={{ color: '#3a716a' }}>{item.widget}</small>
        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{summary(item)}</p>
      </section>)}
    </div>
  </article>;
}
