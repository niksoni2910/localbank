import React from 'react';
import { Landmark, LockKeyhole, LogOut, MessageCircle } from 'lucide-react';
import type { ChatSessionSummary, EmployeeProfile } from '../../shared/contracts';

type SidebarProps = {
  employee: EmployeeProfile;
  sessions: ChatSessionSummary[];
  activeSessionId?: string;
  onNewAnalysis: () => void;
  onOpenSession: (id: string) => void;
  onSignOut: () => void;
};

export function Sidebar({ employee, sessions, activeSessionId, onNewAnalysis, onOpenSession, onSignOut }: SidebarProps) {
  const initials = employee.name.split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();

  return <aside className="sidebar">
    <div className="brand"><div className="brand-icon"><Landmark size={19} /></div><span>LocalBank <small>ANALYST</small></span></div>
    <div className="nav-label">WORKSPACE</div>
    <button className="nav-active" onClick={onNewAnalysis}><MessageCircle size={17} />New analysis</button>
    {sessions.length > 0 && <>
      <div className="nav-label">RECENT SESSIONS</div>
      <div className="session-list">
        {sessions.slice(0, 8).map(s => <button
          key={s.id}
          type="button"
          className={`session-item${s.id === activeSessionId ? ' active' : ''}`}
          onClick={() => onOpenSession(s.id)}
          title={`Resume in CLI: /resume ${s.id.slice(0, 8)}`}
        >
          <span className="session-title">{s.title}</span>
          <small>{s.surface.toUpperCase()} · {s.id.slice(0, 8)}</small>
        </button>)}
      </div>
    </>}
    <div className="sidebar-bottom">
      <div className="security-note"><LockKeyhole size={15} /><span>Cookie-verified session<br /><small>Synthetic portfolio</small></span></div>
      <div className="profile">
        <div className="avatar">{initials}</div>
        <div className="profile-meta"><b>{employee.name}</b><small>{employee.title}</small></div>
        <button type="button" className="logout-btn" onClick={onSignOut} title="Sign out"><LogOut size={15} /></button>
      </div>
    </div>
  </aside>;
}
