import { Router, type NextFunction, type Request, type Response } from 'express';
import { config } from '../agent/config.js';
import {
  authenticateEmployee,
  buildClearSessionCookieHeader,
  buildSessionCookieHeader,
  demoEmployeeHints,
  getEmployeeById,
  parseCookieHeader,
  SESSION_COOKIE_NAME,
  signSessionCookieValue,
  verifySessionCookieValue,
} from '../auth.js';
import { loginRequestSchema, type EmployeeProfile } from '../shared/contracts.js';
import { createAuthSession, deleteAuthSession, getAuthSession } from '../store.js';

export function resolveAuthenticatedEmployee(req: Request): { employee: EmployeeProfile; sid: string } | null {
  const cookies = parseCookieHeader(req.headers.cookie);
  const raw = cookies[SESSION_COOKIE_NAME];
  const sid = verifySessionCookieValue(raw);
  if (!sid) return null;
  const authSession = getAuthSession(sid);
  if (!authSession) return null;
  const employee = getEmployeeById(authSession.employeeId);
  if (!employee) return null;
  return { employee, sid };
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = resolveAuthenticatedEmployee(req);
  if (!auth) {
    return res.status(401).json({ error: 'Authentication required. Sign in with your employee email and password.' });
  }
  res.locals.employee = auth.employee;
  res.locals.sid = auth.sid;
  return next();
}

export function createAuthRouter() {
  const router = Router();

  router.get('/demo', (_req, res) => {
    res.json({ accounts: demoEmployeeHints });
  });

  router.post('/login', (req: Request, res: Response) => {
    const parsed = loginRequestSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return res.status(400).json({ error: 'Provide a valid employee email and password.' });
    }
    const employee = authenticateEmployee(parsed.data.email, parsed.data.password);
    if (!employee) {
      return res.status(401).json({ error: 'Invalid employee email or password.' });
    }
    const session = createAuthSession(employee.employeeId, config.sessionTtlMs);
    const signed = signSessionCookieValue(session.sid);
    res.setHeader('Set-Cookie', buildSessionCookieHeader(signed, Math.floor(config.sessionTtlMs / 1000)));
    return res.json({ employee });
  });

  router.get('/me', requireAuth, (_req: Request, res: Response) => {
    return res.json({ employee: res.locals.employee });
  });

  router.post('/logout', (req: Request, res: Response) => {
    const auth = resolveAuthenticatedEmployee(req);
    if (auth) deleteAuthSession(auth.sid);
    res.setHeader('Set-Cookie', buildClearSessionCookieHeader());
    return res.json({ ok: true });
  });

  return router;
}
