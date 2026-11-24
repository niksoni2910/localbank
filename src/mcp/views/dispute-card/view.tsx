import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function DisputeCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading dispute status…</p>;
  if (status === 'error') return <p>Could not load the demo dispute status.</p>;

  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const disputes = data.disputes ?? [];
  const money = (n: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n || 0);

  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>Dispute tracker</h2>
    {disputes.length === 0 ? <p>No demo disputes found.</p> : disputes.map((d: any) =>
      <article key={d.id} style={{ padding: 14, marginTop: 10, border: '1px solid #e5eaf2', borderRadius: 12 }}>
        <strong>{d.merchant} · {money(d.amount)}</strong>
        <p>{d.reason}</p>
        <p>Status: <b>{d.status}</b></p>
        <small>Estimated resolution: {d.estimatedResolution} · Case {d.id}</small>
      </article>
    )}
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>Synthetic demo case data only.</small>
  </section>;
}
