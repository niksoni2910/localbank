import React from 'react';
import { BadgeIndianRupee, Landmark, Receipt, ShieldAlert, TrendingUp, Users } from 'lucide-react';
import { money } from '../types';
import { CategoryControl, DashboardControls, DashboardPrompt } from './DashboardControls';

type WidgetProps = {
  data: any;
  onDashboardUpdate?: (scenario: string, inputs: Record<string, number>, prompt: string, customerId?: string) => void;
  onDashboardPrompt?: (scenario: string, inputs: Record<string, number>, prompt: string, customerId?: string) => void;
  onWidgetInputs?: (inputs: Record<string, number>) => void;
  dashboardInputs?: Record<string, number>;
  dashboardScenario?: string;
  updating?: boolean;
  updatedAt?: number;
  updateError?: string;
};

export function Widget({ data, onDashboardUpdate, onDashboardPrompt, onWidgetInputs, dashboardInputs, dashboardScenario, updating = false, updatedAt, updateError }: WidgetProps) {
  if (!data) return null;

  if (data.widget === 'dashboard') {
    return <div className="dashboard">
      <div className="dashboard-head"><strong>{data.title}</strong><span className="live-pill">{updating ? 'UPDATING' : updatedAt ? 'UPDATED' : 'ANALYST'}</span></div>
      {updateError && <div className="dashboard-error" role="alert">{updateError}</div>}
      <DashboardPrompt disabled={updating} onApply={prompt => onDashboardPrompt?.(data.scenario, data.inputs, prompt, data.customerId)} />
      <DashboardControls data={data} disabled={updating} onApply={inputs => onDashboardUpdate?.(data.scenario, inputs, data.prompt || '', data.customerId)} />
      <div className={`dashboard-grid${data.widgets.length % 2 === 1 ? ' odd' : ''}`}>
        {data.widgets.map((item: any, index: number) => <section className="dashboard-item" key={`${item.widget}-${index}`}>
          <Widget data={item} dashboardInputs={data.inputs} dashboardScenario={data.scenario} onWidgetInputs={inputs => onDashboardUpdate?.(data.scenario, { ...data.inputs, ...inputs }, data.prompt || '', data.customerId)} updating={updating} />
          {item.scenarioNote && <small className="disclaimer scenario-note">{item.scenarioNote}</small>}
        </section>)}
      </div>
      {updatedAt && <small className="dashboard-updated">Updated at {new Date(updatedAt).toLocaleTimeString()}</small>}
    </div>;
  }

  if (data.widget === 'portfolio') {
    return <div className="widget">
      <div className="widget-head"><span>Portfolio overview ({data.totalBranches ?? 6} branches · {data.totalCustomers} customers · {data.totalAccounts ?? 0} accounts)</span><span className="live-pill">AUM</span></div>
      <div className="total">{money(data.totalAum)}</div>
      <div className="subtle">Total AUM (Deposits {money(data.totalDeposits)} + FDs {money(data.totalFdBook)} · {data.totalTransactions ?? 0} txns)</div>
      <div className="calc-grid" style={{ marginTop: 12 }}>
        <div className="calc-box"><small>Loan book</small><strong>{money(data.totalLoanBook)}</strong></div>
        <div className="calc-box"><small>Avg FOIR · Alerts</small><strong>{data.avgFoirPercent}%</strong><small>{data.openDisputes} disputes · {data.kycActionNeeded} KYC pending</small></div>
      </div>
      <div className="account-list">
        {(data.segments || []).map((seg: any) => <div className="account-row" key={seg.segment}>
          <div className="account-icon"><Users size={16} /></div>
          <div className="account-meta"><b>{seg.segment} ({seg.customers})</b><small>Avg income {money(seg.avgMonthlyIncome)} · Loans {money(seg.totalLoanBook)}</small></div>
          <strong>{money(seg.totalDeposits + seg.totalFdBook)}</strong>
        </div>)}
      </div>
    </div>;
  }

  if (data.widget === 'branches') {
    const branches = data.branches || [];
    return <div className="widget">
      <div className="widget-head"><span>Bank branches · {data.scope}</span><span className="live-pill">{data.branchCount} BRANCHES · {data.totalAccounts} ACCOUNTS</span></div>
      <div className="account-list">
        {branches.map((b: any) => <div className="dispute-card" key={b.branchId}>
          <b>{b.branchName} ({b.branchId}) · {b.ifsc}</b>
          <small>{b.city} ({b.region}) · Manager: {b.manager}</small>
          <small>{b.customerCount} customers · {b.accountCount} accounts · {b.openDisputes} disputes · {b.kycActionNeeded} KYC pending · AUM {money(b.totalAum)} · Loans {money(b.totalLoanBook)}</small>
          {branches.length === 1 && <small>Customers: {(b.customers || []).map((c: any) => `${c.customerName} (${c.customerId}, ${c.accountCount} accts)`).join(' · ')}</small>}
        </div>)}
      </div>
    </div>;
  }

  if (data.widget === 'customers') {
    return <div className="widget">
      <div className="widget-head"><span>Customer cohort</span><span className="live-pill">{data.count ?? (data.customers || []).length} MATCHED</span></div>
      <div className="account-list">
        {(data.customers || []).map((c: any) => <div className="account-row" key={c.customerId}>
          <div className="account-icon"><Users size={16} /></div>
          <div className="account-meta">
            <b>{c.customerName} ({c.customerId}) · {c.segment}</b>
            <small>{c.city} · FOIR {c.foirPercent}% · Util {c.creditUtilizationPercent}% · KYC {c.kycStatus}</small>
            {c.riskFlags?.length > 0 && <small className="negative">Risks: {c.riskFlags.join(', ')}</small>}
            {c.opportunities?.length > 0 && <small className="positive">Growth: {c.opportunities.join(', ')}</small>}
          </div>
          <strong>{money(c.totalBalance)}</strong>
        </div>)}
      </div>
    </div>;
  }

  if (data.widget === 'customer360') {
    return <div className="widget">
      <div className="widget-head"><span>Customer 360 · {data.customerName} ({data.customerId})</span><span className="live-pill">{data.segment}</span></div>
      <div className="subtle">{data.branchName ? `${data.branchName} (${data.branchId}) · ` : ''}{data.city} · {data.relationshipYears}y · Engagement {data.engagementScore}/100 · KYC {data.kyc?.status}</div>
      <div className="calc-grid" style={{ marginTop: 12 }}>
        <div className="calc-box"><small>Deposits ({data.accountCount ?? (data.accounts || []).length} accts) + FDs</small><strong>{money((data.totalBalance || 0) + (data.totalFdPrincipal || 0))}</strong><small>Cash {money(data.totalBalance)} · FD {money(data.totalFdPrincipal)}</small></div>
        <div className="calc-box"><small>Loans & ratios</small><strong>{money(data.totalLoanOutstanding)}</strong><small>FOIR {data.foirPercent}% · Card util {data.creditUtilizationPercent}%</small></div>
      </div>
      {(data.accounts || []).length > 0 && <div className="account-list">
        {data.accounts.map((a: any) => <div className="account-row" key={a.id}>
          <div className="account-icon"><Landmark size={16} /></div>
          <div className="account-meta"><b>{a.type} ({a.id})</b><small>{a.masked}</small></div>
          <strong>{money(a.balance)}</strong>
        </div>)}
      </div>}
      {data.riskFlags?.length > 0 && <div className="insight" style={{ background: '#fff4e4', color: '#9a3412' }}>Risk flags: <b>{data.riskFlags.join(' · ')}</b></div>}
      {data.opportunities?.length > 0 && <div className="insight">Opportunities: <b>{data.opportunities.join(' · ')}</b></div>}
    </div>;
  }

  if (data.widget === 'insights') {
    return <div className="widget">
      <div className="widget-head"><span>Segment insights · {data.scope}</span><span className="live-pill">{data.customerCount} CUSTOMERS</span></div>
      <div className="subtle">Average engagement score: {data.avgEngagementScore}/100</div>
      {(data.riskAlerts || []).length > 0 && <div className="account-list">
        {data.riskAlerts.map((r: any) => <div className="dispute-card" key={`risk-${r.customerId}`}><b>Risk · {r.customerName} ({r.customerId})</b><small>{r.segment}</small><span className="status-warning">{(r.flags || []).join(' · ')}</span></div>)}
      </div>}
      {(data.growthOpportunities || []).length > 0 && <div className="account-list">
        {data.growthOpportunities.map((g: any) => <div className="account-row" key={`opp-${g.customerId}`}>
          <div className="account-icon"><TrendingUp size={16} /></div>
          <div className="account-meta"><b>{g.customerName} ({g.customerId})</b><small>{(g.opportunities || []).join(' · ')}</small></div>
          <strong>{money(g.totalBalance)}</strong>
        </div>)}
      </div>}
    </div>;
  }

  if (data.widget === 'risk') {
    return <div className="widget">
      <div className="widget-head"><span>Risk & compliance audit</span><span className="live-pill">{data.flaggedCount}/{data.totalCustomers} FLAGGED</span></div>
      <div className="subtle">Thresholds: FOIR &ge; {data.foirThreshold}% · Card utilization &ge; {data.utilizationThreshold}%</div>
      {(data.flaggedCustomers || []).map((c: any) => <div className="dispute-card" key={c.customerId}>
        <b>{c.customerName} ({c.customerId}) · {c.segment}</b>
        <span className="status-warning">{(c.reasons || []).join(' · ')}</span>
        {c.pendingKycItems?.length > 0 && <small>Pending KYC: {c.pendingKycItems.join(', ')}</small>}
      </div>)}
    </div>;
  }

  if (data.widget === 'penetration') {
    return <div className="widget">
      <div className="widget-head"><span>Product penetration · {data.scope}</span><span className="live-pill">{data.avgProductsPerCustomer} AVG PRODUCTS</span></div>
      <div className="spend-list" style={{ marginTop: 6 }}>
        {(data.products || []).map((p: any) => <div key={p.product} className="spend-row">
          <span>{p.product} ({p.holders}/{data.totalCustomers})</span>
          <strong>{p.penetrationPercent}%</strong>
          <div className="bar-track"><div className="bar" style={{ width: `${Math.min(100, p.penetrationPercent || 0)}%` }} /></div>
        </div>)}
      </div>
      {(data.bySegment || []).length > 1 && <div className="account-list">
        {data.bySegment.map((s: any) => <div className="account-row" key={s.segment}>
          <div className="account-meta"><b>{s.segment} ({s.customers})</b><small>Cards {s.creditCardRate}% · FDs {s.fdRate}% · Loans {s.loanRate}%</small></div>
        </div>)}
      </div>}
    </div>;
  }

  if (data.widget === 'regions') {
    return <div className="widget">
      <div className="widget-head"><span>Regional performance ({data.totalCities} cities)</span><span className="live-pill">TOP: {data.topCityByAum}</span></div>
      <div className="account-list">
        {(data.regions || []).map((r: any) => <div className="account-row" key={r.city}>
          <div className="account-icon"><Landmark size={16} /></div>
          <div className="account-meta"><b>{r.city} ({r.customers})</b><small>Loans {money(r.totalLoanBook)} · Eng {r.avgEngagement}/100 · Alerts {r.flaggedCustomers}</small></div>
          <strong>{money(r.totalAum)}</strong>
        </div>)}
      </div>
    </div>;
  }

  if (data.widget === 'liquidity') {
    return <div className="widget">
      <div className="widget-head"><span>Liquidity & FD maturity pipeline</span><span className="live-pill">LDR {data.loanToDepositRatioPercent}%</span></div>
      <div className="calc-grid">
        <div className="calc-box"><small>Liquid deposits</small><strong>{money(data.totalLiquidDeposits)}</strong></div>
        <div className="calc-box"><small>FD book ({data.maturingSoonCount} maturing soon)</small><strong>{money(data.totalFdBook)}</strong></div>
      </div>
      {(data.fdMaturities || []).length > 0 && <div className="account-list">
        {data.fdMaturities.slice(0, 6).map((f: any) => <div className="account-row" key={f.fdId}>
          <div className="account-meta"><b>{f.customerName} ({f.fdId}) · {f.status}</b><small>Matures {f.maturityDate} @ {f.rate}%</small></div>
          <strong>{money(f.maturityAmount)}</strong>
        </div>)}
      </div>}
      {(data.idleCashCandidates || []).length > 0 && <div className="insight">Idle-cash FD sweep candidates: <b>{data.idleCashCandidates.map((c: any) => c.customerName).join(', ')}</b></div>}
    </div>;
  }

  if (data.widget === 'retention') {
    return <div className="widget">
      <div className="widget-head"><span>Churn & retention matrix</span><span className="live-pill">AVG ENG {data.avgEngagementScore}/100</span></div>
      <div className="subtle">High risk: {data.highRiskCount} · Watchlist: {data.watchlistCount} · Healthy: {data.healthyCount}</div>
      <div className="account-list">
        {(data.customers || []).map((c: any) => <div className="dispute-card" key={c.customerId}>
          <b>{c.customerName} ({c.customerId}) · {c.segment} · {c.engagementScore}/100</b>
          <span className={c.tier === 'High Risk' ? 'status-warning' : 'live-pill'}>{c.tier}</span>
          <small>{(c.drivers || []).join(' · ')}</small>
          <small>Action: {c.recommendedAction}</small>
        </div>)}
      </div>
    </div>;
  }

  if (data.widget === 'balance') return <div className="widget"><div className="widget-head"><span>Deposit snapshot · {data.customerName || data.customerId}</span><span className="live-pill">SYNTHETIC</span></div><div className="total">{money(data.totalBalance)}</div><div className="subtle">Total deposit balance</div><div className="account-list">{data.accounts.map((a: any) => <div className="account-row" key={a.id}><div className="account-icon"><Landmark size={17} /></div><div className="account-meta"><b>{a.type}</b><small>{a.masked}</small></div><strong>{money(a.balance)}</strong></div>)}</div></div>;
  if (data.widget === 'transactions') return <div className="widget"><div className="widget-head"><span>Transactions · {data.scope || 'Portfolio'}</span><span className="live-pill">{data.count ?? (data.transactions || []).length} MATCHED</span></div>{(dashboardScenario === 'portfolio-summary' || dashboardScenario === 'risk-audit') && onWidgetInputs && <CategoryControl value={dashboardInputs?.transactionCategory ?? 0} disabled={updating} onApply={onWidgetInputs} />}<div className="tx-list">{data.transactions.map((t: any) => <div className="tx-row" key={`${t.reference}-${t.date}`}><div className="tx-icon"><Receipt size={16} /></div><div className="tx-info"><b>{t.merchant} {t.customerName ? `· ${t.customerName}` : ''}</b><small>{t.date} · {t.category} · {t.channel || 'Card'} ({t.account}) · {t.status}</small><small className="ref">{t.reference}</small></div><strong className={t.amount >= 0 ? 'positive' : 'negative'}>{t.amount >= 0 ? '+' : '−'}{money(Math.abs(t.amount))}</strong></div>)}</div></div>;
  if (data.widget === 'cards') return <div className="widget"><div className="widget-head">Cards overview {data.customerName ? `· ${data.customerName}` : ''}</div>{data.cards.map((c: any) => <div className="bank-card" key={c.id}><div className="card-top"><span>{c.name}</span><span className="chip" /></div><div className="card-number">{c.masked}</div><div className="card-bottom"><span>{c.status}</span>{c.available != null && <span>Available {money(c.available)}</span>}{c.usedToday != null && <span>Today {money(c.usedToday)} / {money(c.dailyLimit)}</span>}</div></div>)}</div>;
  if (data.widget === 'fd' || data.widget === 'emi') return <div className="widget calc-widget"><div className="widget-head">{data.widget === 'fd' ? 'Fixed deposit projection' : 'Loan EMI projection'}</div><div className="calc-grid"><div className="calc-box"><small>{data.widget === 'fd' ? 'Maturity value' : 'Monthly EMI'}</small><strong>{money(data.widget === 'fd' ? data.maturityAmount : data.monthlyEmi)}</strong></div><div className="calc-box"><small>{data.widget === 'fd' ? 'Interest earned' : 'Total interest'}</small><strong>{money(data.widget === 'fd' ? data.interestEarned : data.totalInterest)}</strong></div></div><div className="calc-meta">Principal {money(data.principal)} · {data.annualRate}% · {data.months} months</div><small className="disclaimer">Illustrative simulation only.</small></div>;
  if (data.widget === 'fds') return <div className="widget"><div className="widget-head"><span>Fixed deposits · {data.customerName || data.customerId}</span><span className="live-pill">SYNTHETIC</span></div><div className="total">{money(data.totalPrincipal)}</div><div className="subtle">Total maturity: {money(data.totalMaturity)}</div><div className="account-list">{(data.fixedDeposits || []).map((f: any) => <div className="account-row" key={f.id}><div className="account-icon"><Landmark size={17} /></div><div className="account-meta"><b>{f.id} · {f.rate}% p.a. · {f.status}</b><small>Matures {f.maturityDate} · {money(f.maturityAmount)}</small></div><strong>{money(f.principal)}</strong></div>)}</div></div>;
  if (data.widget === 'loans') return <div className="widget"><div className="widget-head"><span>Loan accounts · {data.customerName || data.customerId}</span><span className="live-pill">SYNTHETIC</span></div><div className="total">{money(data.totalOutstanding)}</div><div className="subtle">Total monthly EMI: {money(data.totalMonthlyEmi)}</div><div className="account-list">{(data.loans || []).map((l: any) => <div className="account-row" key={l.id}><div className="account-icon"><BadgeIndianRupee size={17} /></div><div className="account-meta"><b>{l.type} · {l.id}</b><small>EMI {money(l.emi)}/mo · {l.rate}% · {l.remainingMonths}m left</small></div><strong>{money(l.principalOutstanding)}</strong></div>)}</div></div>;
  if (data.widget === 'spending') return <div className="widget"><div className="widget-head">Spending breakdown · {data.scope || 'Portfolio'}</div><div className="spend-total">{money(data.total)}<small>Total category spend</small></div><div className="spend-list">{data.spending.map((s: any) => <div key={s.category} className="spend-row"><span>{s.category}</span><strong>{money(s.amount)}</strong><div className="bar-track"><div className="bar" style={{ width: `${data.total ? s.amount / data.total * 100 : 0}%` }} /></div></div>)}</div><div className="insight">✨ Top category: <b>{data.topCategory}</b></div></div>;
  if (data.widget === 'eligibility') return <div className="widget"><div className="widget-head">Underwriting affordability simulation</div><div className="calc-box"><small>Estimated EMI</small><strong>{money(data.estimatedEmi)}</strong></div><div className="meter"><div style={{ width: `${Math.min(100, data.estimatedFoirPercent)}%` }} /></div><div className="meter-label">Simulated FOIR (EMI-to-income): <b>{data.estimatedFoirPercent}%</b></div><div className={`fit-status ${data.indicative ? 'fit' : 'caution'}`}>{data.indicative ? 'Within 50% indicative FOIR threshold' : 'Above 50% indicative FOIR threshold'}</div><p className="calc-meta">Requested {money(data.requestedAmount)} · {data.months} months</p><small className="disclaimer">Decision-support simulation only; verify credit policy.</small></div>;
  if (data.widget === 'kyc') return <div className="widget"><div className="widget-head">KYC profile {data.customerName ? `· ${data.customerName}` : ''}</div><div className="status-success"><ShieldAlert size={17} />{data.status}</div><p className="calc-meta">Last updated: {data.lastUpdated} · Next review: {data.nextReview}</p>{data.pendingItems?.length > 0 && <div className="insight">Pending: <b>{data.pendingItems.join(', ')}</b></div>}</div>;
  if (data.widget === 'disputes') return <div className="widget"><div className="widget-head">Dispute tracker</div>{(data.disputes || []).map((d: any) => <div className="dispute-card" key={d.id}><b>{d.merchant} · {money(d.amount)} {d.customerName ? `(${d.customerName})` : ''}</b><small>{d.reason}</small><span className="status-warning">{d.status}</span><small>Est. resolution: {d.estimatedResolution} · Case {d.id}</small></div>)}</div>;
  if (data.widget === 'cashflow') return <div className="widget"><div className="widget-head">{data.months}-month cash-flow forecast <span className="live-pill">SCENARIO</span></div><div className="calc-grid"><div className="calc-box"><small>Net per month</small><strong className={data.netMonthlyCashFlow >= 0 ? 'positive' : 'negative'}>{money(data.netMonthlyCashFlow)}</strong></div><div className="calc-box"><small>Projected ending balance</small><strong>{money(data.endingBalance)}</strong></div></div><div className="spend-list">{data.projection.map((row: any) => <div className="spend-row" key={row.month}><span>Month {row.month} · net {money(row.netCashFlow)}</span><strong>{money(row.projectedBalance)}</strong><div className="bar-track"><div className="bar" style={{ width: `${Math.max(3, Math.min(100, row.projectedBalance / Math.max(data.startingBalance, data.endingBalance, 1) * 100))}%` }} /></div></div>)}</div><small className="disclaimer">{data.note}</small></div>;
  if (data.widget === 'debtPlan') return <div className="widget"><div className="widget-head">Debt payoff comparison <span className="live-pill">SCENARIO</span></div><div className="calc-grid"><div className="calc-box"><small>Standard plan</small><strong>{data.standard.months == null ? 'Payment does not cover interest' : `${data.standard.months} months`}</strong><small>Total interest: {data.standard.totalInterest == null ? '—' : money(data.standard.totalInterest)}</small></div><div className="calc-box"><small>With {money(data.extraPayment)} extra / month</small><strong>{data.accelerated.months == null ? 'Payment does not cover interest' : `${data.accelerated.months} months`}</strong><small>Total interest: {data.accelerated.totalInterest == null ? '—' : money(data.accelerated.totalInterest)}</small></div></div><div className="insight">Estimated interest saved: <b>{data.interestSaved == null ? 'Unavailable' : money(data.interestSaved)}</b> · Time saved: <b>{data.monthsSaved == null ? 'Unavailable' : `${data.monthsSaved} months`}</b></div><small className="disclaimer">{data.note}</small></div>;
  if (data.widget === 'savingsGoal') return <div className="widget"><div className="widget-head">Savings advisory plan <span className="live-pill">SCENARIO</span></div><div className="calc-box"><small>Goal of {money(data.goalAmount)} in {data.months} months</small><strong>{money(data.monthlyContribution)} / month</strong></div><div className="savings-progress-label"><span>Progress from current savings</span><strong>{Math.min(100, Math.round(data.currentSavings / data.goalAmount * 100))}%</strong></div><div className="savings-progress"><span style={{ width: `${Math.min(100, Math.max(0, data.currentSavings / data.goalAmount * 100))}%` }} /></div><div className="spend-list"><div className="spend-row"><span>Starting savings</span><strong>{money(data.currentSavings)}</strong></div><div className="spend-row"><span>Assumed growth at {data.annualRate}%</span><strong>{money(data.estimatedGrowth)}</strong></div></div><small className="disclaimer">{data.note}</small></div>;
  return null;
}
