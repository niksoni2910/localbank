import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function BranchOverviewCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading bank branches…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Bank Branches ({d.branchCount ?? 0} · {d.totalCustomers ?? 0} customers · {d.totalAccounts ?? 0} accounts)</h3>
    <div style={{ display: 'grid', gap: 8 }}>
      {(d.branches ?? []).map((b: any) => <div key={b.branchId} style={{ background: '#fff', padding: 10, borderRadius: 10, border: '1px solid #e5eaf2' }}>
        <strong>{b.branchName} ({b.branchId})</strong><span style={{ float: 'right' }}>AUM {money(b.totalAum)}</span>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>IFSC {b.ifsc} · Mgr {b.manager} · {b.customerCount} customers · {b.accountCount} accounts · {b.transactionCount} txns</div>
      </div>)}
    </div>
  </div>;
}
