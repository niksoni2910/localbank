import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUp, Bot, Check, CircleHelp, Copy, Landmark, LockKeyhole, Sparkles, Terminal } from 'lucide-react';
import type { ChatSessionSummary, EmployeeProfile } from '../shared/contracts';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { Widget } from './components/Widget';
import { API_BASE_URL, HISTORY_KEY, HISTORY_LIMIT, loadHistory, type Msg, type PromptEntry, PromptHistoryContext, suggestions } from './types';
import './style.css';

async function readChatResponse(response: Response, handlers: { onWidgets?: (widgets: any[], widget: any) => void; onDelta?: (text: string) => void }) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/event-stream')) {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The analytics request failed.');
    return data;
  }
  if (!response.body) throw new Error('Empty response stream.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalResponse: any = null;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.startsWith('data:')) continue;
      const event = JSON.parse(line.slice(5).trim());
      if (event.type === 'widgets') handlers.onWidgets?.(event.widgets, event.widget);
      else if (event.type === 'delta') handlers.onDelta?.(event.text);
      else if (event.type === 'done') finalResponse = event.response;
      else if (event.type === 'error') throw new Error(event.error || 'The analytics request failed.');
    }
  }
  if (!finalResponse) throw new Error('Stream ended unexpectedly.');
  return finalResponse;
}

function App() {
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(() => {
    const id = new URLSearchParams(window.location.search).get('session')?.trim();
    return id || undefined;
  });
  const [copiedResume, setCopiedResume] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelState, setModelState] = useState('Connecting model');
  const [showMenu, setShowMenu] = useState(false);
  const [updatingWidgetIndex, setUpdatingWidgetIndex] = useState<number | null>(null);
  const [promptHistory, setPromptHistory] = useState<PromptEntry[]>(loadHistory);

  useEffect(() => { try { localStorage.setItem(HISTORY_KEY, JSON.stringify(promptHistory)); } catch { /* ignore */ } }, [promptHistory]);
  const addHistory = (scenario: string, prompt: string, ok: boolean) => setPromptHistory(current => [{ id: crypto.randomUUID(), prompt, scenario, at: Date.now(), ok }, ...current].slice(0, HISTORY_LIMIT));

  const syncSessionUrl = (sid?: string) => {
    const url = new URL(window.location.href);
    if (sid) url.searchParams.set('session', sid);
    else url.searchParams.delete('session');
    window.history.replaceState({}, '', url.toString());
  };

  async function refreshSessions() {
    try {
      const r = await fetch(`${API_BASE_URL}/api/sessions`, { credentials: 'include' });
      if (r.status === 401) { setEmployee(null); return; }
      const d = await r.json();
      if (Array.isArray(d.sessions)) setSessions(d.sessions);
    } catch { /* ignore */ }
  }

  async function openSession(sessionId: string) {
    try {
      const r = await fetch(`${API_BASE_URL}/api/sessions/${encodeURIComponent(sessionId)}`, { credentials: 'include' });
      if (r.status === 401) { setEmployee(null); return; }
      if (!r.ok) { setActiveSessionId(undefined); syncSessionUrl(undefined); return; }
      const d = await r.json();
      if (d.session) {
        setActiveSessionId(d.session.id);
        syncSessionUrl(d.session.id);
        setMessages(Array.isArray(d.session.messages) ? d.session.messages : []);
      }
    } catch { /* ignore */ }
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        setModelState(`${String(d.provider || 'model').toUpperCase()} · ${d.model}`);
        setEmployee(d.employee ?? null);
        setAuthChecked(true);
      })
      .catch(() => { setModelState('API unavailable'); setAuthChecked(true); });
  }, []);

  useEffect(() => {
    if (!employee) { setSessions([]); return; }
    void refreshSessions();
    if (activeSessionId) void openSession(activeSessionId);
  }, [employee?.employeeId]);

  function startNewAnalysis() {
    setActiveSessionId(undefined);
    syncSessionUrl(undefined);
    setMessages([]);
  }

  async function signOut() {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    setEmployee(null);
    setSessions([]);
    setMessages([]);
    setActiveSessionId(undefined);
    syncSessionUrl(undefined);
  }

  function copyResumeCmd() {
    if (!activeSessionId) return;
    navigator.clipboard?.writeText(`/resume ${activeSessionId.slice(0, 8)}`).then(() => {
      setCopiedResume(true);
      setTimeout(() => setCopiedResume(false), 1800);
    }).catch(() => {});
  }

  async function send(text = input) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    const assistantIndex = next.length;
    setMessages(next); setInput(''); setLoading(true);
    let inserted = false;
    const patchAssistant = (updater: (current?: Msg) => Msg) => {
      setMessages(current => {
        if (!inserted) { inserted = true; return [...current, updater()]; }
        return current.map((m, idx) => idx === assistantIndex ? updater(m) : m);
      });
    };
    try {
      const r = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
        body: JSON.stringify({ sessionId: activeSessionId, surface: 'web', message: text }),
      });
      if (r.status === 401) { setEmployee(null); return; }
      const d = await readChatResponse(r, {
        onWidgets: (widgets, widget) => patchAssistant(m => ({ role: 'assistant', content: m?.content || '', widget, widgets })),
        onDelta: (delta) => patchAssistant(m => ({ role: 'assistant', content: (m?.content || '') + delta, widget: m?.widget, widgets: m?.widgets })),
      });
      patchAssistant(() => ({ role: 'assistant', content: d.answer, widget: d.widget, widgets: d.widgets }));
      if (d.sessionId) { setActiveSessionId(d.sessionId); syncSessionUrl(d.sessionId); void refreshSessions(); }
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Could not reach the analytics API.';
      patchAssistant(m => ({ role: 'assistant', content: error, widget: m?.widget, widgets: m?.widgets }));
    } finally { setLoading(false); }
  }

  async function updateDashboard(messageIndex: number, scenario: string, inputs: Record<string, number>, prompt = '', useLlm = false, customerId?: string) {
    if (loading) return;
    setLoading(true); setUpdatingWidgetIndex(messageIndex);
    setMessages(current => current.map((message, index) => index === messageIndex ? { ...message, updateError: undefined } : message));
    try {
      const payload = { scenario, inputs, prompt, ...(customerId ? { customerId } : {}), ...(activeSessionId ? { sessionId: activeSessionId, messageIndex } : {}) };
      const r = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(useLlm ? { 'Accept': 'text/event-stream' } : {}) },
        body: JSON.stringify(useLlm ? { dashboardPrompt: payload } : { dashboardUpdate: payload }),
      });
      if (r.status === 401) { setEmployee(null); return; }
      const d = await readChatResponse(r, {
        onWidgets: (widgets, widget) => setMessages(current => current.map((message, index) => index === messageIndex ? { ...message, widget: widget || message.widget, widgets: widgets?.length ? widgets : message.widgets, updatedAt: Date.now() } : message)),
      });
      if (useLlm) addHistory(scenario, prompt, true);
      setMessages(current => current.map((message, index) => index === messageIndex ? { ...message, content: d.answer, widget: d.widget || message.widget, widgets: d.widget ? [d.widget] : message.widgets, updatedAt: Date.now(), updateError: undefined } : message));
      if (activeSessionId) void refreshSessions();
    } catch (error) {
      if (useLlm) addHistory(scenario, prompt, false);
      const note = error instanceof Error ? error.message : 'Could not update the briefing.';
      setMessages(current => current.map((message, index) => index === messageIndex ? { ...message, updateError: note } : message));
    } finally { setLoading(false); setUpdatingWidgetIndex(null); }
  }

  if (!authChecked) return <div className="login-shell"><div className="login-card"><p className="login-sub">Checking employee session…</p></div></div>;
  if (!employee) return <LoginView modelState={modelState} onSignedIn={emp => { setEmployee(emp); setMessages([]); }} />;

  return <PromptHistoryContext.Provider value={{ entries: promptHistory, clear: () => setPromptHistory([]) }}>
    <div className="app-shell">
      <Sidebar employee={employee} sessions={sessions} activeSessionId={activeSessionId} onNewAnalysis={startNewAnalysis} onOpenSession={openSession} onSignOut={signOut} />
      <main className="main">
        <header className="topbar">
          <div className="mobile-brand"><Landmark size={18} /> LocalBank Analyst</div>
          {activeSessionId && <button type="button" className="resume-pill" onClick={copyResumeCmd} title="Copy CLI /resume command">
            <Terminal size={13} /><span>CLI: /resume {activeSessionId.slice(0, 8)}</span>{copiedResume ? <Check size={13} /> : <Copy size={12} />}
          </button>}
          <div className="local-status"><span className="status-dot" />{modelState}</div>
          <button className="help-btn" onClick={() => setShowMenu(!showMenu)}><CircleHelp size={17} /> Help</button>
          {showMenu && <div className="help-pop"><b>Authenticated workspace</b><p>Signed in as {employee.email} ({employee.title}). All records (6 branches, 18 customers) are synthetic. Continue this chat in terminal with <code>/resume {activeSessionId?.slice(0, 8) || ''}</code>.</p></div>}
        </header>
        <section className="chat-area">
          <div className="messages">
            <div className="welcome">
              <div className="welcome-icon"><Sparkles size={20} /></div>
              <h1>Customer intelligence, on demand.</h1>
              <p>Analyze synthetic bank branches, customer cohorts, multi-account 360 profiles, KYC/FOIR/utilization risks, and cross-sell opportunities across the portfolio.</p>
              <div className="suggestion-grid">{suggestions.map(s => <button className="suggestion" key={s.label} onClick={() => send(s.prompt)}><div className="suggestion-icon"><s.icon size={17} /></div><span><b>{s.label}</b><small>{s.desc}</small></span></button>)}</div>
              <div className="demo-banner"><LockKeyhole size={14} /><span>Internal employee workbench · Synthetic portfolio (6 branches, 18 customers) · Read-only.</span></div>
            </div>
            {messages.map((m, i) => {
              const list = m.widgets?.length ? m.widgets : m.widget ? [m.widget] : [];
              const isMultiWidgetGroup = list.length >= 2 && list.every((w: any) => w.widget !== 'dashboard');
              return <div className={`message ${m.role}`} key={i}>
                <div className="message-avatar">{m.role === 'assistant' ? <Bot size={16} /> : <span>RM</span>}</div>
                <div className="message-content">
                  <div className="message-label">{m.role === 'assistant' ? 'LocalBank Analyst AI' : 'Analyst'}</div>
                  {isMultiWidgetGroup ? (
                    <div className="dashboard">
                      <div className="dashboard-head"><strong>Analyst briefing</strong><span className="live-pill">{list.length} WIDGETS</span></div>
                      <div className={`dashboard-grid${list.length % 2 === 1 ? ' odd' : ''}`}>
                        {list.map((w: any, wi: number) => <section className="dashboard-item" key={`${w.widget}-${wi}`}><Widget data={w} /></section>)}
                      </div>
                    </div>
                  ) : list.map((w: any, wi: number) => <Widget key={wi} data={w} onDashboardUpdate={(scenario, inputs, prompt, customerId) => updateDashboard(i, scenario, inputs, prompt, false, customerId)} onDashboardPrompt={(scenario, inputs, prompt, customerId) => updateDashboard(i, scenario, inputs, prompt, true, customerId)} updating={updatingWidgetIndex === i} updatedAt={m.updatedAt} updateError={m.updateError} />)}
                  {m.content && <div className="message-text">{m.content}</div>}
                </div>
              </div>;
            })}
            {loading && updatingWidgetIndex === null && <div className="message assistant"><div className="typing"><span /><span /><span /></div></div>}
          </div>
        </section>
        <footer className="composer-wrap">
          <div className="composer"><textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask about customer segments, risk flags, CUST-1042, or growth opportunities…" rows={1} /><button className="send-btn" onClick={() => send()} disabled={!input.trim() || loading}><ArrowUp size={18} /></button></div>
          <div className="composer-foot"><span><LockKeyhole size={12} /> Read-only employee analytics · synthetic customer data</span><span>Enter to send · Shift+Enter for newline</span></div>
        </footer>
      </main>
    </div>
  </PromptHistoryContext.Provider>;
}

createRoot(document.getElementById('root')!).render(<App />);
