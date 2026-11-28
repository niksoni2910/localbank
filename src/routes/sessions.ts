import { Router, type Request, type Response } from 'express';
import { createSessionSchema, type EmployeeProfile } from '../shared/contracts.js';
import { createChatSession, deleteChatSession, getChatSession, listChatSessions } from '../store.js';
import { requireAuth } from './auth.js';

export function createSessionsRouter() {
  const router = Router();
  router.use(requireAuth);

  router.get('/', (_req: Request, res: Response) => {
    const employee = res.locals.employee as EmployeeProfile;
    return res.json({ sessions: listChatSessions(employee.employeeId) });
  });

  router.post('/', (req: Request, res: Response) => {
    const employee = res.locals.employee as EmployeeProfile;
    const parsed = createSessionSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid session creation payload.' });
    }
    const session = createChatSession(employee.employeeId, parsed.data.surface, parsed.data.title);
    return res.status(201).json({ session });
  });

  router.get('/:id', (req: Request, res: Response) => {
    const employee = res.locals.employee as EmployeeProfile;
    const sessionId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const session = getChatSession(sessionId, employee.employeeId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or outside your access.' });
    }
    return res.json({ session });
  });

  router.delete('/:id', (req: Request, res: Response) => {
    const employee = res.locals.employee as EmployeeProfile;
    const sessionId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = deleteChatSession(sessionId, employee.employeeId);
    if (!deleted) {
      return res.status(404).json({ error: 'Session not found or outside your access.' });
    }
    return res.json({ ok: true });
  });

  return router;
}
