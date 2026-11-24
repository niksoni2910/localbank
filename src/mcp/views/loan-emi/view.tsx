import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function LoanEmi() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Calculating loan repayment…</p>;
  if (status === 'error') return <p>Could not calculate this loan estimate.</p>;

  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n || 0);

  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>Loan repayment estimate</h2>
    <p>Principal: <b>{money(data.principal)}</b> · Rate: {data.annualRate}% · Tenure: {data.months} months</p>
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}>Monthly EMI<br/><b>{money(data.monthlyEmi)}</b></div>
      <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}>Total interest<br/><b>{money(data.totalInterest)}</b></div>
    </div>
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>Illustrative estimate only; this is not a credit offer.</small>
  </section>;
}
