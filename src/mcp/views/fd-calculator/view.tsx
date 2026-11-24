import React from 'react';
import { useToolContext } from 'mcp-use/react';
export default function CalculatorCard() {
  const { status, toolOutput } = useToolContext<any>();
  if (status === 'pending') return <p>Calculating…</p>;
  const d = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const money = (n:number) => '₹' + (n || 0).toLocaleString('en-IN',{maximumFractionDigits:0});
  const isFd = 'maturityAmount' in d;
  return <div style={{padding:16,fontFamily:'Inter,system-ui',background:'#f8fafc',borderRadius:14,color:'#17283d'}}><h3>{isFd?'Fixed deposit estimate':'Loan repayment estimate'}</h3><div style={{fontSize:12,color:'#64748b'}}>Principal / loan amount</div><h2>{money(d.principal)}</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><div style={{background:'white',padding:12,borderRadius:10}}><small>{isFd?'Maturity value':'Monthly EMI'}</small><strong style={{display:'block',fontSize:20}}>{money(isFd?d.maturityAmount:d.monthlyEmi)}</strong></div><div style={{background:'white',padding:12,borderRadius:10}}><small>{isFd?'Interest earned':'Total interest'}</small><strong style={{display:'block',fontSize:20}}>{money(isFd?d.interestEarned:d.totalInterest)}</strong></div></div><p style={{fontSize:12,color:'#64748b'}}>Rate: {d.annualRate}% · Tenure: {d.months} months</p><small>Illustrative calculation only; bank product terms may differ.</small></div>;
}
