import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function ProductPenetrationCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Analyzing product penetration…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 6px' }}>Product Penetration · {d.scope}</h3>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Avg products/customer: {d.avgProductsPerCustomer} ({d.totalCustomers} customers)</div>
    <div style={{ display: 'grid', gap: 8 }}>
      {(d.products ?? []).map((p: any) => <div key={p.product} style={{ background: '#fff', padding: 10, borderRadius: 10 }}>
        <strong>{p.product}</strong><span style={{ float: 'right' }}>{p.penetrationPercent}% ({p.holders})</span>
      </div>)}
    </div>
  </div>;
}
