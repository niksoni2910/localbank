import React from 'react';
import { ModelContext, useCallTool, useToolContext, useViewState } from 'mcp-use/react';

const fields: Record<string, { key: string; label: string; step?: number }[]> = {
  'financial-health': [
    { key: 'monthlyIncome', label: 'Monthly income' }, { key: 'fixedExpenses', label: 'Fixed expenses' },
    { key: 'variableBudget', label: 'Flexible spending' }, { key: 'months', label: 'Forecast months', step: 1 },
    { key: 'startingBalance', label: 'Starting balance' }, { key: 'extraPayment', label: 'Extra loan payment' },
  ],
  'credit-readiness': [
    { key: 'monthlyIncome', label: 'Monthly income' }, { key: 'existingEmi', label: 'Current EMIs' },
    { key: 'requestedAmount', label: 'Hypothetical loan amount' }, { key: 'months', label: 'Loan term in months', step: 1 },
    { key: 'annualRate', label: 'Assumed rate (%)', step: 0.1 },
  ],
  'savings-plan': [
    { key: 'goalAmount', label: 'Savings target' }, { key: 'currentSavings', label: 'Starting savings' },
    { key: 'months', label: 'Goal timeline in months', step: 1 }, { key: 'annualRate', label: 'Assumed return (%)', step: 0.1 },
  ],
  'card-activity': [{ key: 'transactionLimit', label: 'Transactions to show', step: 1 }],
};

export default function BankingDashboard() {
  const { status, toolOutput } = useToolContext<any>();
  const refresh = useCallTool('banking-dashboard');
  const initial = (toolOutput as any)?.structuredContent?.data ?? (toolOutput as any)?.data ?? {};
  const [draft, setDraft] = useViewState<Record<string, number>>(() => initial.inputs ?? {});
  const [promptDraft, setPromptDraft] = useViewState<{ value: string }>(() => ({ value: '' }));
  if (status === 'pending' && !refresh.data) return <p>Loading banking review…</p>;
  if (status === 'error') return <p>Could not load the banking review.</p>;

  const d = (refresh.data as any)?.structuredContent?.data ?? initial;
  const money = (n: number | null) => n == null ? 'Unavailable' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
  const summary = (item: any) => {
    switch (item.widget) {
      case 'balance': return `Total demo balance ${money(item.totalBalance)}`;
      case 'spending': return `Sample spending ${money(item.total)} · top category ${item.topCategory}`;
      case 'cashflow': return `Monthly net ${money(item.netMonthlyCashFlow)} · projected balance ${money(item.endingBalance)}`;
      case 'debtPlan': return `Estimated interest saved ${money(item.interestSaved)} · ${item.monthsSaved ?? '—'} months sooner`;
      case 'cards': return `${item.cards?.length ?? 0} demo cards · ${item.cards?.map((c: any) => c.status).join(', ')}`;
      case 'eligibility': return `Hypothetical EMI ${money(item.estimatedEmi)} · income ratio ${item.estimatedFoirPercent}%`;
      case 'transactions': return `${item.transactions?.length ?? 0} sample transactions shown`;
      case 'disputes': return `${item.disputes?.length ?? 0} sample dispute cases`;
      case 'savingsGoal': return `Estimated contribution ${money(item.monthlyContribution)} per month`;
      case 'fd': return `Example maturity estimate ${money(item.maturityAmount)}`;
      case 'emi': return `Illustrative EMI ${money(item.monthlyEmi)} per month`;
      case 'kyc': return `KYC status: ${item.status}`;
      default: return 'Synthetic banking overview';
    }
  };
  const context = `User-edited ${d.scenario} banking dashboard inputs: ${JSON.stringify(draft)}. Applied focus prompt: ${d.prompt ?? ''}. Updated results: ${JSON.stringify((d.widgets ?? []).map((item: any) => ({ widget: item.widget, keyResult: summary(item) })))}.`;
  const deck: Record<string, string> = {
    'financial-health': 'A clear view of balances, spending, cash flow and debt.',
    'credit-readiness': 'A snapshot of card activity and a hypothetical borrowing scenario.',
    'savings-plan': 'Your balances, savings target and an illustrative deposit estimate.',
    'card-activity': 'A concise look at cards, recent activity and open disputes.',
  };

  return <ModelContext content={context}>
    <article style={{ padding: '20px 22px 14px', fontFamily: 'Inter,system-ui', color: '#183e43', background: '#f5faf8', border: '1px solid #d6e5e1', borderRadius: 12 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid #bfd2ce', color: '#1b625f', fontSize: 11 }}>
        <strong>LocalBank <span style={{ fontWeight: 500, color: '#6d8581' }}>· Your money briefing</span></strong>
        <time>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, padding: '18px 0 14px' }}>
        <div><h2 style={{ margin: 0, font: '600 27px/1.15 Georgia,serif', color: '#173e43' }}>{d.title}</h2><p style={{ margin: '7px 0 0', color: '#627b77', fontSize: 12 }}>{deck[d.scenario]}</p></div>
        <span style={{ flexShrink: 0, padding: '5px 9px', borderRadius: 20, background: '#e2f0ec', color: '#286c65', fontSize: 10 }}>{refresh.isPending ? 'Recalculating' : refresh.data ? 'Updated' : 'Demo edition'}</span>
      </div>
      <div style={{ height: 3, background: '#24736d', marginBottom: 8 }} />
      <section style={{ padding: 12, margin: '12px 0', background: '#eaf3f0', border: '1px solid #d2e4df', borderRadius: 9 }}>
        <label style={{ display: 'grid', gap: 5, fontSize: 12 }}>
          Additional prompt
          <textarea rows={2} value={promptDraft.value} onChange={(event) => setPromptDraft({ value: event.target.value })} placeholder="For example: show only balances and recent transactions"
            style={{ padding: 8, border: '1px solid #c9dcd7', borderRadius: 7, background: '#fbfdfc', font: 'inherit', resize: 'vertical' }} />
        </label>
        <button disabled={refresh.isPending || !promptDraft.value.trim()} onClick={() => { void refresh.callTool({ scenario: d.scenario, inputs: draft, prompt: promptDraft.value }); setPromptDraft({ value: '' }); }}
          style={{ marginTop: 10, padding: '8px 11px', border: 0, borderRadius: 7, background: '#216a65', color: 'white', cursor: 'pointer' }}>
          {refresh.isPending ? 'Applying prompt...' : 'Apply prompt'}
        </button>
      </section>
      <details style={{ margin: '12px 0 2px' }}>
        <summary style={{ width: 'max-content', padding: '6px 10px', border: '1px solid #c9dcd7', borderRadius: 7, color: '#3b6964', fontSize: 10, cursor: 'pointer' }}>Edit assumptions</summary>
        <div style={{ padding: 12, marginTop: 9, background: '#eaf3f0', borderRadius: 9 }}>
          <b style={{ fontSize: 11, color: '#486e69' }}>Adjust the figures used in this briefing</b>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 9, marginTop: 10 }}>
            {(fields[d.scenario] ?? []).map((field) => <label key={field.key} style={{ display: 'grid', gap: 4, fontSize: 12 }}>
              {field.label}
              <input type="number" min="0" step={field.step ?? 1} value={draft[field.key] ?? d.inputs?.[field.key] ?? 0}
                onChange={(event) => setDraft({ ...draft, [field.key]: Number(event.target.value) })}
                style={{ padding: 8, border: '1px solid #c9dcd7', borderRadius: 7, background: '#fbfdfc' }} />
            </label>)}
          </div>
          <button disabled={refresh.isPending} onClick={() => void refresh.callTool({ scenario: d.scenario, inputs: draft, prompt: d.prompt ?? '' })}
            style={{ marginTop: 10, padding: '8px 11px', border: 0, borderRadius: 7, background: '#216a65', color: 'white', cursor: 'pointer' }}>
            {refresh.isPending ? 'Updating parameters…' : 'Update parameters'}
          </button>
          {refresh.error && <p role="alert">Could not update the briefing: {String(refresh.error)}</p>}
        </div>
      </details>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '0 24px' }}>
        {(d.widgets ?? []).map((item: any, index: number) => <section key={`${item.widget}-${index}`} style={{ minWidth: 0, padding: '15px 0 14px', borderTop: index === 0 ? 0 : '1px solid #d1dfdc', gridColumn: index === 0 ? '1 / -1' : undefined }}>
          <small style={{ color: '#3a716a', fontSize: 10 }}>{item.widget}</small>
          <p style={{ margin: '5px 0', color: '#244f50', font: '600 16px/1.3 Georgia,serif' }}>{summary(item)}</p>
          {item.scenarioNote && <small style={{ color: '#647b76' }}>{item.scenarioNote}</small>}
        </section>)}
      </div>
      <footer style={{ paddingTop: 10, borderTop: '1px solid #c9d9d5', color: '#71847f', fontSize: 9 }}>A private demo briefing · Figures and projections use synthetic data</footer>
    </article>
  </ModelContext>;
}
