import { stdin as input, stdout as output } from 'node:process';
import type { Interface as ReadlineInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { config } from '../agent/config.js';
import type { EmployeeProfile } from '../shared/contracts.js';
import { apiFetch, clearCliCookie, COOKIE_FILE } from './api-client.js';
import { printKeyValueCard } from './format.js';

let maskSecret = false;

export const rlOutput = new Writable({
  write(chunk, encoding, callback) {
    if (!maskSecret) {
      output.write(chunk, encoding, callback);
      return;
    }
    const text = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
    if (text === '\n' || text === '\r\n') output.write('\n');
    callback();
  },
});

export async function promptSecret(rl: ReadlineInterface, label: string): Promise<string> {
  if (!input.isTTY) {
    return (await rl.question(label)).trim();
  }
  output.write(label);
  maskSecret = true;
  try {
    return (await rl.question('')).trim();
  } finally {
    maskSecret = false;
  }
}

export function printWhoAmI(employee: EmployeeProfile | null, activeSessionId?: string) {
  if (!employee) {
    console.log('Not signed in. Run /login to sign in with your employee email and password.');
    return;
  }
  printKeyValueCard('Authenticated Employee (Cookie Session)', [
    ['Name', employee.name],
    ['Email', employee.email],
    ['Role', employee.title],
    ['Cookie File', COOKIE_FILE],
    ['Active Chat', activeSessionId ? activeSessionId : '(new session on next prompt)'],
  ]);
}

export type LoginResult = { employee: EmployeeProfile | null; exit?: boolean };

export async function performLogin(rl: ReadlineInterface, initialEmail?: string): Promise<LoginResult> {
  try {
    const hintsRes = await apiFetch('/api/auth/demo');
    if (hintsRes.ok) {
      const hintsData = await hintsRes.json() as { accounts?: Array<{ email: string; password: string; name: string; title: string }> };
      if (hintsData.accounts?.length) {
        console.log('\nSynthetic employee logins:');
        for (const a of hintsData.accounts) {
          console.log(`  · ${a.email}  (${a.title})  pw: ${a.password}`);
        }
      }
    }
  } catch { /* ignore */ }

  const email = initialEmail?.trim() || (await rl.question('\nEmployee email: ')).trim();
  if (/^\/(?:exit|quit)(?:\(\))?$/i.test(email)) return { employee: null, exit: true };
  if (!email || /^\/?cancel$/i.test(email)) return { employee: null };
  const password = await promptSecret(rl, 'Password: ');
  if (/^\/(?:exit|quit)(?:\(\))?$/i.test(password)) return { employee: null, exit: true };
  if (!password) return { employee: null };

  let res: globalThis.Response;
  try {
    res = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    console.error(`Could not reach API (${config.apiUrl}): ${error instanceof Error ? error.message : String(error)}`);
    return { employee: null };
  }
  const data = await res.json() as { employee?: EmployeeProfile; error?: string };
  if (!res.ok || !data.employee) {
    console.error(`Login failed: ${data.error ?? `HTTP ${res.status}`}`);
    return { employee: null };
  }
  console.log(`Signed in as ${data.employee.name} (${data.employee.email} · ${data.employee.title})`);
  return { employee: data.employee };
}

export async function performLogout() {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch { /* ignore */ }
  clearCliCookie();
  console.log('Signed out and cleared session cookie.');
}
