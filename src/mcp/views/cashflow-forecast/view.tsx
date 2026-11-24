import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function CashflowForecast() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Projecting the scenario…</p>;
  if (status === 'error') return <p>Could not calculate this cash-flow scenario.</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>{d.months}-month cash-flow forecast</h2>
    <p>Net monthly cash flow: <b>{money(d.netMonthlyCashFlow)}</b> · Projected ending balance: <b>{money(d.endingBalance)}</b></p>
    <div style={{ display: 'grid', gap: 8 }}>{(d.projection ?? []).map((row: any) => <div key={row.month} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, background: '#f8fafc', borderRadius: 9 }}><span>Month {row.month} · net {money(row.netCashFlow)}</span><strong>{money(row.projectedBalance)}</strong></div>)}</div>
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>{d.note}</small>
  </section>;
}
