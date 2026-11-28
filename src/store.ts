import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { ChatMessage, ChatSessionRecord, ChatSessionSummary } from './shared/contracts.js';

export type StoredAuthSession = {
  sid: string;
  employeeId: string;
  createdAt: number;
  expiresAt: number;
};

type PersistedState = {
  authSessions: StoredAuthSession[];
  chatSessions: ChatSessionRecord[];
};

const STATE_PATH = resolve(process.cwd(), '.localbank', 'state.json');

function ensureStateDir() {
  mkdirSync(dirname(STATE_PATH), { recursive: true, mode: 0o700 });
}

function loadState(): PersistedState {
  if (!existsSync(STATE_PATH)) {
    return { authSessions: [], chatSessions: [] };
  }
  try {
    const raw = readFileSync(STATE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const now = Date.now();
    return {
      authSessions: Array.isArray(parsed.authSessions)
        ? parsed.authSessions.filter(s => s && typeof s.sid === 'string' && s.expiresAt > now)
        : [],
      chatSessions: Array.isArray(parsed.chatSessions) ? parsed.chatSessions : [],
    };
  } catch {
    return { authSessions: [], chatSessions: [] };
  }
}

function saveState(state: PersistedState) {
  ensureStateDir();
  const tmpPath = `${STATE_PATH}.tmp`;
  writeFileSync(tmpPath, JSON.stringify(state, null, 2), { encoding: 'utf8', mode: 0o600 });
  renameSync(tmpPath, STATE_PATH);
}

export function createAuthSession(employeeId: string, ttlMs: number): StoredAuthSession {
  const state = loadState();
  const now = Date.now();
  const session: StoredAuthSession = {
    sid: randomUUID(),
    employeeId,
    createdAt: now,
    expiresAt: now + ttlMs,
  };
  state.authSessions.push(session);
  saveState(state);
  return session;
}

export function getAuthSession(sid: string): StoredAuthSession | null {
  const state = loadState();
  const match = state.authSessions.find(s => s.sid === sid && s.expiresAt > Date.now());
  return match ?? null;
}

export function deleteAuthSession(sid: string): void {
  const state = loadState();
  const next = state.authSessions.filter(s => s.sid !== sid);
  if (next.length !== state.authSessions.length) {
    state.authSessions = next;
    saveState(state);
  }
}

function toSummary(session: ChatSessionRecord): ChatSessionSummary {
  const lastMsg = session.messages.at(-1);
  const preview = lastMsg?.content?.replace(/\s+/g, ' ').trim().slice(0, 90) ?? '';
  return {
    id: session.id,
    employeeId: session.employeeId,
    title: session.title,
    surface: session.surface,
    messageCount: session.messages.length,
    lastMessagePreview: preview,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}

function deriveTitle(messages: ChatMessage[], fallback = 'New analysis'): string {
  const firstUser = messages.find(m => m.role === 'user')?.content?.replace(/\s+/g, ' ').trim();
  if (!firstUser) return fallback;
  return firstUser.length > 64 ? `${firstUser.slice(0, 61)}...` : firstUser;
}

export function createChatSession(employeeId: string, surface: 'web' | 'cli', title = 'New analysis'): ChatSessionRecord {
  const state = loadState();
  const now = Date.now();
  const session: ChatSessionRecord = {
    id: randomUUID(),
    employeeId,
    title,
    surface,
    messageCount: 0,
    lastMessagePreview: '',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  state.chatSessions.unshift(session);
  saveState(state);
  return session;
}

export function listChatSessions(employeeId: string, limit = 25): ChatSessionSummary[] {
  const state = loadState();
  return state.chatSessions
    .filter(s => s.employeeId === employeeId)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limit)
    .map(toSummary);
}

export function getChatSession(sessionIdOrPrefix: string, employeeId: string): ChatSessionRecord | null {
  const state = loadState();
  const needle = sessionIdOrPrefix.trim().toLowerCase();
  const owned = state.chatSessions.filter(s => s.employeeId === employeeId);
  const exact = owned.find(s => s.id.toLowerCase() === needle);
  if (exact) return exact;
  if (needle.length >= 6) {
    const prefixMatches = owned
      .filter(s => s.id.toLowerCase().startsWith(needle))
      .sort((a, b) => b.updatedAt - a.updatedAt);
    if (prefixMatches.length === 1) return prefixMatches[0];
  }
  return null;
}

export function appendChatTurn(
  sessionId: string | undefined,
  employeeId: string,
  surface: 'web' | 'cli',
  userMessage: ChatMessage,
  assistantMessage: ChatMessage,
): ChatSessionRecord {
  const state = loadState();
  const now = Date.now();
  let session = sessionId
    ? state.chatSessions.find(s => s.id === sessionId && s.employeeId === employeeId)
    : undefined;

  if (!session) {
    session = {
      id: sessionId || randomUUID(),
      employeeId,
      title: deriveTitle([userMessage]),
      surface,
      messageCount: 0,
      lastMessagePreview: '',
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    state.chatSessions.unshift(session);
  }

  session.messages.push(
    { ...userMessage, createdAt: userMessage.createdAt ?? now, surface },
    { ...assistantMessage, createdAt: assistantMessage.createdAt ?? now, surface },
  );
  session.surface = surface;
  session.updatedAt = now;
  session.messageCount = session.messages.length;
  session.lastMessagePreview = assistantMessage.content.replace(/\s+/g, ' ').trim().slice(0, 90);
  if (session.title === 'New analysis') {
    session.title = deriveTitle(session.messages);
  }
  saveState(state);
  return session;
}

export function updateChatSessionMessage(
  sessionId: string,
  employeeId: string,
  messageIndex: number,
  patch: Partial<ChatMessage>,
): ChatSessionRecord | null {
  const state = loadState();
  const session = state.chatSessions.find(s => s.id === sessionId && s.employeeId === employeeId);
  if (!session || !session.messages[messageIndex]) return null;
  session.messages[messageIndex] = { ...session.messages[messageIndex], ...patch };
  session.updatedAt = Date.now();
  session.lastMessagePreview = session.messages.at(-1)?.content?.replace(/\s+/g, ' ').trim().slice(0, 90) ?? '';
  saveState(state);
  return session;
}

export function deleteChatSession(sessionId: string, employeeId: string): boolean {
  const state = loadState();
  const before = state.chatSessions.length;
  state.chatSessions = state.chatSessions.filter(s => !(s.id === sessionId && s.employeeId === employeeId));
  if (state.chatSessions.length !== before) {
    saveState(state);
    return true;
  }
  return false;
}
