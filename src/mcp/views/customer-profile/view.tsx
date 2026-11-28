import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function CustomerProfileCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading customer profile…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 4px' }}>{d.customerName} ({d.customerId})</h3>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>{d.segment} · {d.city} · {d.relationshipYears}y tenure · KYC {d.kyc?.status}</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <div style={{ background: '#fff', padding: 10, borderRadius: 10 }}>Deposits<br/><strong>{money(d.totalBalance)}</strong></div>
      <div style={{ background: '#fff', padding: 10, borderRadius: 10 }}>Loans<br/><strong>{money(d.totalLoanOutstanding)}</strong></div>
    </div>
  </div>;
}
