import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function KycCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Checking KYC…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  return <div style={{padding:16,fontFamily:'Inter,system-ui',background:'#f8fafc',borderRadius:14,color:'#17283d'}}><h3>Identity verification</h3><div style={{display:'inline-block',padding:'6px 12px',borderRadius:99,background:'#dcfce7',color:'#166534',fontWeight:700}}>{d.status||'Status unavailable'}</div><div style={{marginTop:12,fontSize:13}}>Last updated: {d.lastUpdated||'—'}</div><div style={{marginTop:4,fontSize:13}}>Next review: {d.nextReview||'—'}</div><div style={{marginTop:10}}>{d.pendingItems?.length?`Pending: ${d.pendingItems.join(', ')}`:'No pending demo KYC items.'}</div><small style={{display:'block',marginTop:10}}>Synthetic demo data only.</small></div>;
}
