import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function CustomerSearchCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Searching customers…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const customers = d.customers ?? [];
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 10px' }}>Matched customers ({d.count ?? customers.length})</h3>
    <div style={{ display: 'grid', gap: 8 }}>
      {customers.map((c: any) => <div key={c.customerId} style={{ background: '#fff', padding: 10, borderRadius: 10, border: '1px solid #e5eaf2' }}>
        <strong>{c.customerName} ({c.customerId})</strong> · {c.segment} · {c.city}
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Deposits {money(c.totalBalance)} · FOIR {c.foirPercent}% · KYC {c.kycStatus}</div>
      </div>)}
    </div>
  </div>;
}
