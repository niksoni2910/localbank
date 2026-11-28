import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function ChurnRetentionCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Evaluating retention & churn risk…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Churn & Retention Matrix (Avg engagement {d.avgEngagementScore}/100)</h3>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>High Risk: {d.highRiskCount} · Watchlist: {d.watchlistCount} · Healthy: {d.healthyCount}</div>
    <div style={{ display: 'grid', gap: 8 }}>
      {(d.customers ?? []).slice(0, 6).map((c: any) => <div key={c.customerId} style={{ background: '#fff', padding: 10, borderRadius: 10 }}>
        <strong>{c.customerName} ({c.customerId})</strong> · {c.tier} ({c.engagementScore}/100)
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{c.recommendedAction}</div>
      </div>)}
    </div>
  </div>;
}
