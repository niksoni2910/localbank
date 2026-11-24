import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function DebtPayoff() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Comparing repayment scenarios…</p>;
  if (status === 'error') return <p>Could not compare these repayment scenarios.</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number | null) => n == null ? 'Unavailable' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  const months = (n: number | null) => n == null ? 'Payment does not cover interest' : `${n} months`;
  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>Debt payoff comparison</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {[['Standard', d.standard], [`With ${money(d.extraPayment)} extra / month`, d.accelerated]].map(([label, plan]: any) => <article key={label} style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}><b>{label}</b><p>Payoff: {months(plan?.months)}</p><p>Interest: {money(plan?.totalInterest)}</p></article>)}
    </div>
    <p>Estimated interest saved: <b>{money(d.interestSaved)}</b> · Time saved: <b>{d.monthsSaved == null ? 'Unavailable' : `${d.monthsSaved} months`}</b></p>
    <small style={{ color: '#64748b' }}>{d.note}</small>
  </section>;
}
