import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function RegionalBreakdownCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading regional performance…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Regional Performance ({d.totalCities ?? 0} cities · Top: {d.topCityByAum})</h3>
    <div style={{ display: 'grid', gap: 8 }}>
      {(d.regions ?? []).map((r: any) => <div key={r.city} style={{ background: '#fff', padding: 10, borderRadius: 10 }}>
        <strong>{r.city} ({r.customers})</strong><span style={{ float: 'right' }}>AUM {money(r.totalAum)}</span>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Loans {money(r.totalLoanBook)} · Engagement {r.avgEngagement}/100 · Alerts {r.flaggedCustomers}</div>
      </div>)}
    </div>
  </div>;
}
