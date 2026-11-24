import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function SpendingChart() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading spending analytics…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const rows = d.spending ?? [];
  const max = Math.max(...rows.map((r:any)=>r.amount),1);
  return <div style={{padding:16,fontFamily:'Inter,system-ui',background:'#f8fafc',borderRadius:14,color:'#17283d'}}><h3>Spend by category</h3><div style={{fontSize:12,color:'#64748b'}}>Total sample spending: ₹{(d.total||0).toLocaleString('en-IN')}</div><div style={{display:'grid',gap:12,marginTop:14}}>{rows.map((r:any)=><div key={r.category}><div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}><strong>{r.category}</strong><span>₹{r.amount.toLocaleString('en-IN')}</span></div><div style={{height:9,background:'#e5eaf2',borderRadius:99,overflow:'hidden'}}><div style={{height:9,width:`${r.amount/max*100}%`,background:'#315f9f',borderRadius:99}}/></div></div>)}</div><p style={{marginTop:16}}>Top category: <strong>{d.topCategory}</strong></p><small>Based on synthetic sample data.</small></div>;
}
