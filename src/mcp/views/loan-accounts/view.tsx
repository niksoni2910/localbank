import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function LoanAccountsCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading loan accounts…</p>;
  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const loans = data.loans ?? [];
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 16, color: '#12243a' }}>
    <div style={{ fontSize: 12, color: '#64748b' }}>ACTIVE LOANS · TOTAL EMI {money(data.totalMonthlyEmi)}/MO</div>
    <h2 style={{ margin: '6px 0 14px' }}>{money(data.totalOutstanding)}</h2>
    <div style={{ display: 'grid', gap: 10 }}>
      {loans.map((loan: any) => <div key={loan.id} style={{ padding: 12, background: 'white', borderRadius: 12, border: '1px solid #e5eaf2' }}>
        <strong>{loan.type} ({loan.id})</strong>
        <span style={{ float: 'right', fontWeight: 700 }}>{money(loan.principalOutstanding)}</span>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 5 }}>EMI: {money(loan.emi)}/mo · {loan.rate}% · {loan.remainingMonths} months left · Next due {loan.nextDue}</div>
      </div>)}
    </div>
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>Demo-only synthetic data.</small>
  </div>;
}
