import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function BalanceCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Loading bank data…</p>;
  const data = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const accounts = data.accounts ?? [];
  const cards = data.cards ?? [];
  const currency = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  return <div style={{fontFamily:'Inter,system-ui',padding:16,background:'#f7f9fc',borderRadius:16,color:'#12243a'}}>
    {accounts.length > 0 && <><div style={{fontSize:12,color:'#64748b'}}>TOTAL BALANCE</div><h2 style={{margin:'6px 0 18px'}}>{currency(data.totalBalance)}</h2><div style={{display:'grid',gap:10}}>{accounts.map((a:any)=><div key={a.id} style={{padding:12,background:'white',borderRadius:12,border:'1px solid #e5eaf2'}}><strong>{a.type} account</strong><span style={{float:'right',fontWeight:700}}>{currency(a.balance)}</span><div style={{fontSize:12,color:'#64748b',marginTop:5}}>{a.masked}</div></div>)}</div></>}
    {cards.map((c:any)=><div key={c.id} style={{marginTop:10,padding:14,background:'#142d4b',color:'white',borderRadius:14}}><div>{c.name}</div><strong style={{display:'block',fontSize:18,margin:'12px 0'}}>{c.masked}</strong><div style={{fontSize:12}}>Status: {c.status}</div>{c.available != null && <div style={{marginTop:6}}>Available credit: {currency(c.available)} · Outstanding: {currency(c.outstanding)}</div>}{c.usedToday != null && <div style={{marginTop:6}}>Daily usage: {currency(c.usedToday)} / {currency(c.dailyLimit)}</div>}</div>)}
    <small style={{display:'block',marginTop:12,color:'#64748b'}}>Demo-only synthetic data.</small>
  </div>;
}
