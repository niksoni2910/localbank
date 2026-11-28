import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function PortfolioOverviewCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading portfolio overview…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <div style={{ fontSize: 12, color: '#64748b' }}>TOTAL PORTFOLIO AUM ({d.totalCustomers ?? 0} CUSTOMERS)</div>
    <h2 style={{ margin: '6px 0 12px' }}>{money(d.totalAum)}</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
      <div style={{ background: '#fff', padding: 10, borderRadius: 10 }}>Deposits<br/><strong>{money(d.totalDeposits)}</strong></div>
      <div style={{ background: '#fff', padding: 10, borderRadius: 10 }}>Loan Book<br/><strong>{money(d.totalLoanBook)}</strong></div>
    </div>
    <small style={{ color: '#64748b' }}>Open disputes: {d.openDisputes ?? 0} · KYC actions: {d.kycActionNeeded ?? 0} · Avg FOIR: {d.avgFoirPercent ?? 0}%</small>
  </div>;
}
