import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function CardsSummary() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading card details…</p>;
  if (status === 'error') return <p>Could not load the demo card details.</p>;

  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n || 0);

  return <section style={{ padding: 16, fontFamily: 'Inter,system-ui', color: '#17283d' }}>
    <h2>Card overview</h2>
    {(data.cards ?? []).map((card: any) => <article key={card.id} style={{ padding: 14, marginTop: 10, background: '#183c60', color: 'white', borderRadius: 14 }}>
      <strong>{card.name}</strong><p>{card.masked}</p><small>Status: {card.status}</small>
      {card.available != null && <p>Available credit: {money(card.available)} · Outstanding: {money(card.outstanding)}</p>}
      {card.usedToday != null && <p>Daily debit usage: {money(card.usedToday)} / {money(card.dailyLimit)}</p>}
    </article>)}
    <small style={{ display: 'block', marginTop: 12, color: '#64748b' }}>Synthetic demo card data only.</small>
  </section>;
}
