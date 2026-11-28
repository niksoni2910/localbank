import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function RiskComplianceCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Running risk & compliance audit…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const rows = d.flaggedCustomers ?? [];
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Risk & Compliance Audit ({d.flaggedCount ?? rows.length}/{d.totalCustomers ?? 0} flagged)</h3>
    <div style={{ display: 'grid', gap: 8 }}>
      {rows.map((r: any) => <div key={r.customerId} style={{ background: '#fff', padding: 10, borderRadius: 10 }}>
        <strong>{r.customerName} ({r.customerId})</strong>
        <div style={{ fontSize: 12, color: '#9a3412', marginTop: 4 }}>{(r.reasons ?? []).join(' · ')}</div>
      </div>)}
    </div>
  </div>;
}
