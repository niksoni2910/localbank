import { randomUUID } from 'node:crypto';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { runBankingChat } from './agent/chat.js';
import { config } from './agent/config.js';
import { closeBankMcpClient, getBankMcpConnection, probeMcp } from './agent/mcp-client.js';
import { probeModel } from './agent/llm.js';
import { getModelTools, updateAgentDashboard } from './agent/tools.js';
import { createAuthRouter, requireAuth, resolveAuthenticatedEmployee } from './routes/auth.js';
import { createSessionsRouter } from './routes/sessions.js';
import { appendChatTurn, getChatSession, updateChatSessionMessage } from './store.js';
import {
  chatRequestSchema,
  dashboardPromptSchema,
  dashboardUpdateSchema,
  type ChatMessage,
  type ChatResponse,
  type ChatStreamEvent,
  type DashboardPromptRequest,
  type EmployeeProfile,
} from './shared/contracts.js';

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '256kb' }));

// Request ID and one structured log line per request.
app.use((req, res, next) => {
  const requestId = randomUUID();
  const started = Date.now();
  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  res.on('finish', () => console.log(JSON.stringify({ requestId, method: req.method, path: req.path, status: res.statusCode, ms: Date.now() - started })));
  next();
});

// Fixed-window rate limit per client address (in memory; adequate for a local demo).
const hits = new Map<string, { count: number; resetAt: number }>();
app.use('/api', (req, res, next) => {
  const key = req.ip ?? 'unknown';
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    return next();
  }
  if (++entry.count > config.rateLimitPerMinute) return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  next();
});

app.get('/api/health', async (req, res) => {
  const [modelService, mcp] = await Promise.all([probeModel(), probeMcp()]);
  const auth = resolveAuthenticatedEmployee(req);
  res.json({
    ok: modelService.ok && modelService.modelAvailable && mcp.ok,
    model: config.model,
    provider: config.provider,
    mode: 'synthetic-read-only-demo',
    toolRuntime: 'local-agent',
    authenticated: Boolean(auth),
    employee: auth?.employee ?? null,
    services: { model: modelService, mcp },
  });
});

app.use('/api/auth', createAuthRouter());
app.use('/api/sessions', createSessionsRouter());

app.post('/api/chat', requireAuth, async (req: Request, res: Response) => {
  const employee = res.locals.employee as EmployeeProfile;
  const body = req.body ?? {};
  const requestId = res.locals.requestId;
  const fail = (status: number, message: string, error: unknown) => {
    console.error(JSON.stringify({ requestId, error: error instanceof Error ? error.message : String(error) }));
    return res.status(status).json({ error: `${message}: ${error instanceof Error ? error.message : 'unexpected error'}`, requestId });
  };

  const wantsStream = req.headers.accept?.includes('text/event-stream');
  const sendChat = async (
    messages: ChatMessage[],
    options: {
      dashboardPrompt?: DashboardPromptRequest;
      sessionId?: string;
      surface?: 'web' | 'cli';
      persistTurn?: boolean;
      failStatus?: number;
      failMessage?: string;
    },
  ) => {
    const surface = options.surface ?? 'web';
    const persistResult = (response: ChatResponse): ChatResponse => {
      if (!options.persistTurn) return response;
      const latestUser = [...messages].reverse().find(m => m.role === 'user');
      if (!latestUser) return response;
      const saved = appendChatTurn(
        options.sessionId,
        employee.employeeId,
        surface,
        { role: 'user', content: latestUser.content },
        { role: 'assistant', content: response.answer, widget: response.widget, widgets: response.widgets },
      );
      return { ...response, sessionId: saved.id };
    };

    if (!wantsStream) {
      try {
        const result = await runBankingChat(messages, options.dashboardPrompt, { actor: employee });
        return res.json(persistResult(result));
      } catch (error) {
        return fail(options.failStatus ?? 503, options.failMessage ?? 'Banking request failed', error);
      }
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    const controller = new AbortController();
    res.on('close', () => {
      if (!res.writableEnded) controller.abort();
    });
    const emit = (event: ChatStreamEvent) => {
      if (!res.writableEnded) res.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    try {
      const result = await runBankingChat(messages, options.dashboardPrompt, {
        actor: employee,
        signal: controller.signal,
        onEvent: emit,
      });
      emit({ type: 'done', response: persistResult(result) });
    } catch (error) {
      if (!controller.signal.aborted) {
        const msg = `${options.failMessage ?? 'Banking request failed'}: ${error instanceof Error ? error.message : 'unexpected error'}`;
        console.error(JSON.stringify({ requestId, error: error instanceof Error ? error.message : String(error) }));
        emit({ type: 'error', error: msg, requestId });
      }
    } finally {
      if (!res.writableEnded) res.end();
    }
    return undefined;
  };

  if (body.dashboardPrompt !== undefined) {
    const parsed = dashboardPromptSchema.safeParse(body.dashboardPrompt);
    if (!parsed.success) return res.status(400).json({ error: 'Enter an additional prompt for the briefing.' });
    return sendChat([{ role: 'user', content: parsed.data.prompt }], {
      dashboardPrompt: parsed.data,
      sessionId: parsed.data.sessionId,
      surface: 'web',
      persistTurn: Boolean(parsed.data.sessionId),
      failStatus: 503,
      failMessage: 'Could not apply the prompt',
    });
  }

  if (body.dashboardUpdate !== undefined) {
    const parsed = dashboardUpdateSchema.safeParse(body.dashboardUpdate);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid dashboard input values.' });
    try {
      const widget = await updateAgentDashboard(
        parsed.data.scenario,
        parsed.data.inputs,
        parsed.data.prompt,
        parsed.data.customerId,
        employee,
      );
      if (parsed.data.sessionId && parsed.data.messageIndex !== undefined) {
        updateChatSessionMessage(parsed.data.sessionId, employee.employeeId, parsed.data.messageIndex, {
          content: 'Updated the analyst briefing using your parameters.',
          widget,
          widgets: [widget],
        });
      }
      const response: ChatResponse = {
        sessionId: parsed.data.sessionId,
        answer: 'Updated the analyst briefing using your parameters.',
        widget,
        widgets: [widget],
        model: config.model,
        toolInvoked: true,
      };
      return res.json(response);
    } catch (error) {
      return fail(400, 'Could not update the dashboard', error);
    }
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid chat request.' });

  let history: ChatMessage[] = [];
  let sessionId = parsed.data.sessionId;
  if (sessionId) {
    const existing = getChatSession(sessionId, employee.employeeId);
    if (!existing) {
      return res.status(404).json({ error: 'Chat session not found or outside your access.' });
    }
    sessionId = existing.id;
    history = existing.messages;
  }

  if (parsed.data.message) {
    history = [...history, { role: 'user', content: parsed.data.message }];
  } else if (parsed.data.messages?.length) {
    history = sessionId ? [...history, ...parsed.data.messages.slice(-1)] : parsed.data.messages;
  }

  return sendChat(history, {
    sessionId,
    surface: parsed.data.surface ?? 'web',
    persistTurn: true,
  });
});

// Malformed JSON and oversized bodies.
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ error: 'Request body is not valid JSON.' });
  if (error?.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large.' });
  next(error);
});

async function prewarmServices(retriesLeft = 1) {
  const [model, mcp] = await Promise.allSettled([
    probeModel(),
    getBankMcpConnection().then(() => getModelTools()),
  ]);
  if (model.status === 'fulfilled' && !model.value.ok) {
    console.warn(`Model pre-warm check did not succeed: ${model.value.error ?? 'unavailable'}`);
  }
  if (mcp.status === 'rejected') {
    if (retriesLeft > 0) {
      setTimeout(() => void prewarmServices(retriesLeft - 1), 2000).unref();
      return;
    }
    console.warn('MCP pre-warm deferred:', mcp.reason instanceof Error ? mcp.reason.message : mcp.reason);
  }
}

const port = Number(process.env.PORT ?? config.port);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`LocalBank API listening on 0.0.0.0:${port}`);
  void prewarmServices();
});
const shutdown = () => server.close(() => void closeBankMcpClient().finally(() => process.exit(0)));
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
