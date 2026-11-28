import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { config } from './agent/config.js';
import type { EmployeeProfile, EmployeeRole } from './shared/contracts.js';

export const SESSION_COOKIE_NAME = 'lb_session';

type EmployeeRecord = EmployeeProfile & {
  passwordHash: string;
};

function hashPassword(password: string, salt = randomBytes(16).toString('hex')): string {
  const derived = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 32);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const seedEmployees: Array<Omit<EmployeeRecord, 'passwordHash'> & { demoPassword: string }> = [
  {
    employeeId: 'EMP-HQ-01',
    email: 'ananya.sharma@localbank.in',
    name: 'Ananya Sharma',
    role: 'hq_analyst',
    title: 'Central Portfolio & Risk Analyst',
    demoPassword: 'Analyst@123',
  },
  {
    employeeId: 'EMP-REG-SOUTH',
    email: 'vikram.iyer@localbank.in',
    name: 'Vikram Iyer',
    role: 'regional_head',
    title: 'South Regional Head',
    demoPassword: 'Region@123',
  },
  {
    employeeId: 'EMP-PUN-01',
    email: 'nikhil.kulkarni@localbank.in',
    name: 'Nikhil Kulkarni',
    role: 'branch_manager',
    title: 'Branch Manager · Pune Koregaon Park',
    demoPassword: 'Branch@123',
  },
  {
    employeeId: 'EMP-BLR-01',
    email: 'suresh.menon@localbank.in',
    name: 'Suresh Menon',
    role: 'branch_manager',
    title: 'Branch Manager · Bengaluru Indiranagar',
    demoPassword: 'Branch@123',
  },
  {
    employeeId: 'EMP-MUM-01',
    email: 'kavita.deshpande@localbank.in',
    name: 'Kavita Deshpande',
    role: 'branch_manager',
    title: 'Branch Manager · Mumbai BKC Flagship',
    demoPassword: 'Branch@123',
  },
  {
    employeeId: 'EMP-DEL-01',
    email: 'rajeev.khanna@localbank.in',
    name: 'Rajeev Khanna',
    role: 'branch_manager',
    title: 'Branch Manager · Delhi Connaught Place',
    demoPassword: 'Branch@123',
  },
  {
    employeeId: 'EMP-CHE-01',
    email: 'deepa.sundaram@localbank.in',
    name: 'Deepa Sundaram',
    role: 'branch_manager',
    title: 'Branch Manager · Chennai Adyar',
    demoPassword: 'Branch@123',
  },
  {
    employeeId: 'EMP-HYD-01',
    email: 'padma.reddy@localbank.in',
    name: 'Padma Reddy',
    role: 'branch_manager',
    title: 'Branch Manager · Hyderabad Banjara Hills',
    demoPassword: 'Branch@123',
  },
];

const employees: EmployeeRecord[] = seedEmployees.map(({ demoPassword, ...profile }) => ({
  ...profile,
  passwordHash: hashPassword(demoPassword),
}));

export const demoEmployeeHints = seedEmployees.slice(0, 4).map(e => ({
  email: e.email,
  password: e.demoPassword,
  name: e.name,
  title: e.title,
}));

function toPublicProfile(record: EmployeeRecord): EmployeeProfile {
  const { passwordHash: _ignored, ...profile } = record;
  return profile;
}

export function authenticateEmployee(email: string, password: string): EmployeeProfile | null {
  const normalized = email.trim().toLowerCase();
  const match = employees.find(e => e.email.toLowerCase() === normalized);
  if (!match || !verifyPassword(password, match.passwordHash)) return null;
  return toPublicProfile(match);
}

export function getEmployeeById(employeeId: string): EmployeeProfile | null {
  const match = employees.find(e => e.employeeId === employeeId);
  return match ? toPublicProfile(match) : null;
}

function hmacSign(payload: string): string {
  return createHmac('sha256', config.authSecret).update(payload).digest('base64url');
}

function timingSafeMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function signSessionCookieValue(sid: string): string {
  return `${sid}.${hmacSign(sid)}`;
}

export function verifySessionCookieValue(rawValue: string | undefined): string | null {
  if (!rawValue) return null;
  const dot = rawValue.indexOf('.');
  if (dot <= 0) return null;
  const sid = rawValue.slice(0, dot);
  const sig = rawValue.slice(dot + 1);
  if (!sid || !sig) return null;
  const expected = hmacSign(sid);
  return timingSafeMatch(sig, expected) ? sid : null;
}

export function parseCookieHeader(cookieHeader: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq <= 0) continue;
    const key = part.slice(0, eq).trim();
    const val = part.slice(eq + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }
  return out;
}

export function buildSessionCookieHeader(signedValue: string, maxAgeSeconds: number): string {
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(signedValue)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}`;
}

export function buildClearSessionCookieHeader(): string {
  return `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
}

export type ActorScopePayload = {
  employeeId: string;
  name: string;
  role: EmployeeRole;
  exp: number;
};

/** Signs a short-lived actor token forwarded out-of-band to MCP tools. */
export function signActorToken(actor: EmployeeProfile, ttlMs = 120_000): string {
  const payload: ActorScopePayload = {
    employeeId: actor.employeeId,
    name: actor.name,
    role: actor.role,
    exp: Date.now() + ttlMs,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${encoded}.${hmacSign(encoded)}`;
}

/** Verifies an actor token created by the API server. Throws if forged or expired. */
export function verifyActorToken(token: string): ActorScopePayload {
  const dot = token.indexOf('.');
  if (dot <= 0) throw new Error('Invalid authorization token.');
  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!timingSafeMatch(sig, hmacSign(encoded))) {
    throw new Error('Authorization token signature mismatch.');
  }
  const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as ActorScopePayload;
  if (!parsed?.employeeId || !parsed.exp || parsed.exp < Date.now()) {
    throw new Error('Authorization token has expired.');
  }
  return parsed;
}
