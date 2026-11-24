import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function LoanEligibility() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Estimating affordability…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const currency=(n:number)=>'₹'+(n||0).toLocaleString('en-IN',{maximumFractionDigits:0});
  return <div style={{padding:16,fontFamily:'Inter,system-ui',background:'#f8fafc',borderRadius:14,color:'#17283d'}}><h3>Indicative loan affordability</h3><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'white',padding:14,borderRadius:12}}><div><small>Estimated monthly EMI</small><strong style={{display:'block',fontSize:24}}>{currency(d.estimatedEmi)}</strong></div><div style={{fontSize:13,fontWeight:700,color:d.indicative?'#16824b':'#b45309'}}>{d.indicative?'Indicative fit':'High EMI-to-income ratio'}</div></div><div style={{marginTop:12}}><small>EMI / income estimate</small><div style={{height:10,background:'#e5eaf2',borderRadius:99,marginTop:6}}><div style={{height:10,width:`${Math.min(100,d.estimatedFoirPercent||0)}%`,background:d.indicative?'#24834f':'#c47b2b',borderRadius:99}}/></div><strong>{d.estimatedFoirPercent}%</strong></div><p style={{fontSize:13}}>Amount: {currency(d.requestedAmount)} · Tenure: {d.months} months</p><small>Simulation only—not a credit approval or offer.</small></div>;
}
