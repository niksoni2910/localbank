import React, { useContext, useEffect, useId, useState } from 'react';
import { History as HistoryIcon } from 'lucide-react';
import { dashboardFields, PromptHistoryContext, scenarioLabels } from '../types';

export function DashboardControls({ data, onApply, disabled }: { data: any; onApply: (inputs: Record<string, number>) => void; disabled: boolean }) {
  const [draft, setDraft] = useState<Record<string, number>>(data.inputs || {});
  useEffect(() => setDraft(data.inputs || {}), [data.scenario, data.inputs]);
  const fields = dashboardFields[data.scenario] || [];
  if (!fields.length) return null;
  return <div className="dashboard-controls">
    <div className="dashboard-controls-title">Adjust analyst parameters</div>
    <div className="dashboard-fields">
      {fields.map(field => <label key={field.key}>
        {field.label}
        <input type="number" min="0" step={field.step || 1} value={draft[field.key] ?? 0} onChange={e => setDraft({ ...draft, [field.key]: Number(e.target.value) })} />
      </label>)}
    </div>
    <button className="dashboard-apply" disabled={disabled} onClick={() => onApply(draft)}>{disabled ? 'Updating...' : 'Update parameters'}</button>
  </div>;
}

function PromptHistoryDialog({ onPick, onClose }: { onPick: (prompt: string) => void; onClose: () => void }) {
  const { entries, clear } = useContext(PromptHistoryContext);
  const titleId = useId();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return <div className="history-backdrop" onClick={onClose}><div className="history-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={e => e.stopPropagation()}>
    <div className="history-head"><strong id={titleId}>Query history</strong><button type="button" className="history-close" onClick={onClose} aria-label="Close history">×</button></div>
    {entries.length === 0 ? <p className="history-empty">No saved briefing prompts yet.</p> : <ul className="history-list">{entries.map(entry => <li key={entry.id}><button type="button" className="history-item" onClick={() => { onPick(entry.prompt); onClose(); }}><span className="history-prompt">{entry.prompt}</span><small>{scenarioLabels[entry.scenario] || entry.scenario} · {new Date(entry.at).toLocaleString()} · <span className={entry.ok ? 'history-ok' : 'history-failed'}>{entry.ok ? 'Applied' : 'Failed'}</span></small></button></li>)}</ul>}
    <div className="history-foot"><small>Click a query to reuse it. Stored locally.</small>{entries.length > 0 && <button type="button" className="history-clear" onClick={clear}>Clear history</button>}</div>
  </div></div>;
}

export function DashboardPrompt({ onApply, disabled }: { onApply: (prompt: string) => void; disabled: boolean }) {
  const [prompt, setPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { entries } = useContext(PromptHistoryContext);
  return <div className="dashboard-prompt-panel"><label className="dashboard-prompt-label">Refine analyst briefing<textarea className="dashboard-prompt" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="For example: show risk audit and disputed transactions" rows={2} /></label><div className="dashboard-prompt-actions"><button className="dashboard-apply" disabled={disabled || !prompt.trim()} onClick={() => { onApply(prompt); setPrompt(''); }}>{disabled ? 'Updating...' : 'Apply prompt'}</button><button type="button" className="dashboard-history-btn" onClick={() => setShowHistory(true)}><HistoryIcon size={13} />History{entries.length > 0 ? ` (${entries.length})` : ''}</button></div>{showHistory && <PromptHistoryDialog onPick={setPrompt} onClose={() => setShowHistory(false)} />}</div>;
}

export function CategoryControl({ value, disabled, onApply }: { value: number; disabled: boolean; onApply: (inputs: Record<string, number>) => void }) {
  const id = useId();
  const options = ['All categories', 'Groceries', 'Transfer', 'Transport', 'Income', 'Dining', 'Shopping', 'Bills', 'Cash', 'Healthcare', 'Entertainment'];
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return <div className="widget-control"><label htmlFor={id}>Transaction category</label><div className="widget-filter-row"><select id={id} value={draft} disabled={disabled} onChange={event => setDraft(Number(event.target.value))}>{options.map((option, index) => <option value={index} key={option}>{option}</option>)}</select><button type="button" disabled={disabled || draft === value} onClick={() => onApply({ transactionCategory: draft })}>Apply</button></div></div>;
}
