import React from 'react';
import { useToolContext } from 'mcp-use/react';

export default function LiquidityMaturitiesCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Analyzing liquidity & FD maturities…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{ fontFamily: 'Inter,system-ui', padding: 16, background: '#f7f9fc', borderRadius: 14, color: '#12243a' }}>
    <h3 style={{ margin: '0 0 8px' }}>Liquidity & Maturities (LDR {d.loanToDepositRatioPercent}%)</h3>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Liquid: {money(d.totalLiquidDeposits)} · FD Book: {money(d.totalFdBook)} · Maturing Soon: {d.maturingSoonCount}</div>
    <div style={{ fontSize: 12 }}>Idle cash sweep candidates: {(d.idleCashCandidates ?? []).length} · Low-buffer watch: {(d.lowBufferCustomers ?? []).length}</div>
  </div>;
}
