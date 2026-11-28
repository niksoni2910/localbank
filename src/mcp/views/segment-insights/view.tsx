import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function SegmentInsightsCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Analyzing segment insights…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Insights · {d.scope} ({d.customerCount ?? 0} customers)</h3>
    <div style={{ fontSize: 12, color: '#64748b' }}>Risk alerts: {(d.riskAlerts ?? []).length} · Growth opportunities: {(d.growthOpportunities ?? []).length}</div>
  </div>;
}
