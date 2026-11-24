import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function SavingsGoal() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Calculating your savings scenario…</p>;
  if (status === 'error') return <p>Could not calculate this savings goal.</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>Savings goal plan</h2>
    <p>To reach <b>{money(d.goalAmount)}</b> in {d.months} months, the estimated contribution is:</p>
    <h1>{money(d.monthlyContribution)} / month</h1>
    <p>Starting amount {money(d.currentSavings)} · Estimated growth {money(d.estimatedGrowth)} at an assumed {d.annualRate}% annual return.</p>
    <small style={{ color: '#64748b' }}>{d.note}</small>
  </section>;
}
