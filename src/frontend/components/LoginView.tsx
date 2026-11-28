import React, { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';
import type { EmployeeProfile } from '../../shared/contracts';
import { API_BASE_URL, type DemoHint } from '../types';

export function LoginView({ modelState, onSignedIn }: { modelState: string; onSignedIn: (employee: EmployeeProfile) => void }) {
  const [email, setEmail] = useState('ananya.sharma@localbank.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hints, setHints] = useState<DemoHint[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/auth/demo`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => Array.isArray(d.accounts) && setHints(d.accounts))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const r = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Sign-in failed.');
      onSignedIn(data.employee);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="login-shell">
    <form className="login-card" onSubmit={submit}>
      <div className="login-head">
        <div className="brand-icon"><Landmark size={19} /></div>
        <div>
          <strong>LocalBank Analyst AI</strong>
          <small>{modelState}</small>
        </div>
      </div>
      <h1>Employee Sign In</h1>
      <p className="login-sub">Sign in with your LocalBank employee email and password. Your session cookie keeps your workspace authenticated across web and CLI.</p>
      {error && <div className="login-error" role="alert">{error}</div>}
      <label className="login-field">
        Employee email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@localbank.in" autoComplete="username" required />
      </label>
      <label className="login-field">
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" required />
      </label>
      <button type="submit" className="login-btn" disabled={submitting || !email.trim() || !password}>
        {submitting ? 'Signing in...' : 'Sign in'}
      </button>
      {hints.length > 0 && <div className="login-hints">
        <div className="login-hints-title">Synthetic employee accounts (click to fill)</div>
        {hints.map(h => <button
          key={h.email}
          type="button"
          className="login-hint-item"
          onClick={() => { setEmail(h.email); setPassword(h.password); setError(''); }}
        >
          <span><b>{h.name}</b> <small>{h.title}</small></span>
          <code>{h.email}</code>
        </button>)}
      </div>}
    </form>
  </div>;
}
