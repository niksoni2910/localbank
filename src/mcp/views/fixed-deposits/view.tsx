import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function FixedDepositsCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading fixed deposits…</p>;
  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const deposits = data.fixedDeposits ?? [];
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 16, color: '#12243a' }}>
    <div style={{ fontSize: 12, color: '#64748b' }}>ACTIVE FIXED DEPOSITS</div>
    <h2 style={{ margin: '6px 0 14px' }}>{money(data.totalPrincipal)}</h2>
    <div style={{ display: 'grid', gap: 10 }}>
      {deposits.map((fd: any) => <div key={fd.id} style={{ padding: 12, background: 'white', borderRadius: 12, border: '1px solid #e5eaf2' }}>
        <strong>{fd.id} · {fd.rate}% p.a.</strong>
        <span style={{ float: 'right', fontWeight: 700 }}>{money(fd.principal)}</span>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 5 }}>Maturity: {money(fd.maturityAmount)} on {fd.maturityDate} ({fd.tenureMonths} months)</div>
      </div>)}
    </div>
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>Demo-only synthetic data.</small>
  </div>;
}
