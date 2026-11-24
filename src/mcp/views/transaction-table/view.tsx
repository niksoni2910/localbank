import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function TransactionTable() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading transactions…</p>;
  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const rows = data.transactions ?? data.disputes ?? [];
  return <div style={{fontFamily:'Inter,system-ui',padding:12,background:'#f8fafc',borderRadius:12,color:'#17283d'}}>
    <h3 style={{margin:'4px 0 12px'}}>{data.disputes ? 'Dispute cases' : 'Recent transactions'}</h3>
    <div style={{display:'grid',gap:8}}>{rows.map((r:any,i:number)=><div key={r.reference || r.id || i} style={{background:'white',border:'1px solid #e5eaf2',padding:12,borderRadius:10}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:8}}><strong>{r.merchant || r.id}</strong><strong style={{color:r.amount >= 0 ? '#14804a' : '#be3c48'}}>{r.amount != null ? (r.amount >= 0 ? '+' : '−') + '₹' + Math.abs(r.amount).toLocaleString('en-IN') : r.status}</strong></div>
      <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{r.date || r.filed} · {r.category || r.reason || r.status}</div>
      {r.reference && <div style={{fontSize:11,color:'#94a3b8',marginTop:4}}>Ref: {r.reference}</div>}{r.estimatedResolution && <div style={{fontSize:12,marginTop:4}}>Est. resolution: {r.estimatedResolution}</div>}
    </div>)}</div><small style={{display:'block',marginTop:10,color:'#64748b'}}>Sample records; not linked to a real bank.</small>
  </div>;
}
