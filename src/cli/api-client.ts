import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { config } from '../agent/config.js';
import { probeModel } from '../agent/llm.js';
import { probeMcp } from '../agent/mcp-client.js';
import { SESSION_COOKIE_NAME } from '../auth.js';
import type { ChatResponse, ChatStreamEvent, EmployeeProfile, Widget } from '../shared/contracts.js';

export const COOKIE_FILE = process.env.LOCALBANK_COOKIE_FILE
  ? resolve(process.env.LOCALBANK_COOKIE_FILE)
  : resolve(process.cwd(), '.localbank', 'cli-cookie.json');

type CookieStore = { cookie?: string; updatedAt?: number };

export function loadCliCookie(): string | null {
  if (!existsSync(COOKIE_FILE)) return null;
  try {
    const parsed = JSON.parse(readFileSync(COOKIE_FILE, 'utf8')) as CookieStore;
    return typeof parsed.cookie === 'string' && parsed.cookie.trim() ? parsed.cookie.trim() : null;
  } catch {
    return null;
  }
}

export function saveCliCookie(cookieValue: string) {
  mkdirSync(dirname(COOKIE_FILE), { recursive: true, mode: 0o700 });
  writeFileSync(COOKIE_FILE, JSON.stringify({ cookie: cookieValue, updatedAt: Date.now() }, null, 2), { encoding: 'utf8', mode: 0o600 });
}

export function clearCliCookie() {
  try {
    if (existsSync(COOKIE_FILE)) rmSync(COOKIE_FILE, { force: true });
  } catch { /* ignore */ }
}

function extractSessionCookie(headers: Headers): { nameValue: string; cleared: boolean } | null {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  const rawList = typeof getSetCookie === 'function'
    ? getSetCookie.call(headers)
    : (headers.get('set-cookie') ? [headers.get('set-cookie')!] : []);

  for (const header of rawList) {
    const firstPart = header.split(';')[0]?.trim() ?? '';
    if (!firstPart.startsWith(`${SESSION_COOKIE_NAME}=`)) continue;
    const rawValue = firstPart.slice(SESSION_COOKIE_NAME.length + 1);
    if (!rawValue || /Max-Age=0\b/i.test(header)) {
      return { nameValue: '', cleared: true };
    }
    return { nameValue: firstPart, cleared: false };
  }
  return null;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<globalThis.Response> {
  const headers = new Headers(init.headers);
  const cookie = loadCliCookie();
  if (cookie && !headers.has('Cookie')) {
    headers.set('Cookie', cookie);
  }
  const response = await fetch(`${config.apiUrl}${path}`, { ...init, headers });
  const setCookie = extractSessionCookie(response.headers);
  if (setCookie) {
    if (setCookie.cleared) clearCliCookie();
    else saveCliCookie(setCookie.nameValue);
  }
  return response;
}

export async function fetchCurrentEmployee(): Promise<EmployeeProfile | null> {
  if (!loadCliCookie()) return null;
  try {
    const r = await apiFetch('/api/auth/me');
    if (!r.ok) return null;
    const data = await r.json() as { employee?: EmployeeProfile };
    return data.employee ?? null;
  } catch {
    return null;
  }
}

export async function printHealth() {
  try {
    const r = await apiFetch('/api/health');
    const data = await r.json() as any;
    const model = data.services?.model;
    const mcp = data.services?.mcp;
    console.log(`API (${config.apiUrl}): ready`);
    console.log(`Model (${data.provider}/${data.model}): ${model?.ok && model?.modelAvailable ? 'ready' : `unavailable (${model?.error ?? 'error'})`}`);
    console.log(`MCP (${config.mcpUrl}): ${mcp?.ok ? `ready (${mcp.tools} tools)` : `unavailable (${mcp?.error ?? 'error'})`}`);
    console.log(`Auth: ${data.authenticated && data.employee ? `${data.employee.name} (${data.employee.email})` : 'not signed in'}`);
    return;
  } catch {
    console.log(`API (${config.apiUrl}): unavailable (start with npm run dev:api or npm run dev)`);
  }
  const [model, mcp] = await Promise.all([probeModel(), probeMcp()]);
  console.log(`Model (${config.provider}/${config.model}): ${model.ok && model.modelAvailable ? 'ready' : `unavailable (${model.error ?? 'error'})`}`);
  console.log(`MCP (${config.mcpUrl}): ${mcp.ok ? `ready (${mcp.tools} tools)` : `unavailable (${mcp.error ?? 'error'})`}`);
}

export async function readApiSseChat(
  response: globalThis.Response,
  onWidgetBatch: (widgets: Widget[]) => void,
  onDelta: (text: string) => void,
): Promise<ChatResponse> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/event-stream')) {
    const data = await response.json() as ChatResponse & { error?: string };
    if (!response.ok) throw new Error(data.error || `Request failed (HTTP ${response.status}).`);
    return data;
  }
  if (!response.body) throw new Error('Empty response stream.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalResponse: ChatResponse | null = null;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.startsWith('data:')) continue;
      const event = JSON.parse(line.slice(5).trim()) as ChatStreamEvent;
      if (event.type === 'widgets' && event.widgets.length) onWidgetBatch(event.widgets);
      else if (event.type === 'delta') onDelta(event.text);
      else if (event.type === 'done') finalResponse = event.response;
      else if (event.type === 'error') throw new Error(event.error || 'Analytics request failed.');
    }
  }
  if (!finalResponse) throw new Error('Stream ended unexpectedly.');
  return finalResponse;
}
