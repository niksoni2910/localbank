import type { Interface as ReadlineInterface } from 'node:readline/promises';
import type { ChatSessionRecord, ChatSessionSummary, Widget } from '../shared/contracts.js';
import { apiFetch } from './api-client.js';
import { AI_DIVIDER, dim, printTable, USER_DIVIDER } from './format.js';
import { renderWidget } from './render.js';

export async function listUserSessions(): Promise<ChatSessionSummary[]> {
  const res = await apiFetch('/api/sessions');
  if (res.status === 401) throw new Error('Session expired or not signed in. Run /login.');
  const data = await res.json() as { sessions?: ChatSessionSummary[]; error?: string };
  if (!res.ok) throw new Error(data.error ?? `Failed to load sessions (HTTP ${res.status}).`);
  return data.sessions ?? [];
}

function replayResumedSession(session: ChatSessionRecord) {
  console.log(`\nResumed session ${session.id.slice(0, 8)} · "${session.title}" (${session.surface.toUpperCase()} · ${session.messages.length} messages)`);
  const recent = session.messages.slice(-4);
  const lastAssistantIdx = recent.map(m => m.role).lastIndexOf('assistant');
  recent.forEach((m, idx) => {
    if (m.role === 'user') {
      console.log(`\n${dim(USER_DIVIDER)}`);
      console.log(`› ${m.content}`);
    } else {
      console.log(dim(AI_DIVIDER));
      if (idx === lastAssistantIdx) {
        const list = m.widgets?.length ? (m.widgets as Widget[]) : (m.widget ? [m.widget as Widget] : []);
        for (const w of list) renderWidget(w);
        if (list.length && m.content) console.log('');
      }
      if (m.content) console.log(m.content);
    }
  });
}

export async function resumeSessionFlow(rl: ReadlineInterface | null, targetArg?: string): Promise<string | undefined> {
  const arg = targetArg?.trim();
  let chosenId = arg;
  if (!arg || arg === 'latest') {
    const sessions = await listUserSessions();
    if (!sessions.length) {
      console.log('No saved web or CLI conversations found for this employee.');
      return undefined;
    }
    if (arg === 'latest') {
      chosenId = sessions[0].id;
    } else {
      printTable('Saved Conversations (Web + CLI)', [
        { header: '#', key: 'num', align: 'right' },
        { header: 'Session', key: 'id' },
        { header: 'Origin', key: 'surface' },
        { header: 'Msgs', key: 'msgs', align: 'right' },
        { header: 'Updated', key: 'updated' },
        { header: 'Title', key: 'title', maxWidth: 38 },
      ], sessions.slice(0, 12).map((s, i) => ({
        num: String(i + 1),
        id: s.id.slice(0, 8),
        surface: s.surface.toUpperCase(),
        msgs: String(s.messageCount),
        updated: new Date(s.updatedAt).toLocaleString(),
        title: s.title,
      })), 'Pick a number (e.g. 1), paste a session ID prefix, or press Enter to cancel.');

      if (!rl) return undefined;
      const pick = (await rl.question('Resume # or ID: ')).trim();
      if (!pick) return undefined;
      const num = Number(pick);
      if (Number.isInteger(num) && num >= 1 && num <= Math.min(12, sessions.length)) {
        chosenId = sessions[num - 1].id;
      } else {
        chosenId = pick;
      }
    }
  }

  const res = await apiFetch(`/api/sessions/${encodeURIComponent(chosenId!)}`);
  if (res.status === 401) throw new Error('Not signed in. Run /login.');
  const data = await res.json() as { session?: ChatSessionRecord; error?: string };
  if (!res.ok || !data.session) throw new Error(data.error ?? `Could not resume session "${chosenId}".`);
  replayResumedSession(data.session);
  return data.session.id;
}
