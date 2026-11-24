import { randomUUID } from 'node:crypto';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { runBankingChat } from './agent/chat.js';
import { config } from './agent/config.js';
import { closeBankMcpClient, probeMcp } from './agent/mcp-client.js';
import { probeModel } from './agent/llm.js';
import { updateAgentDashboard } from './agent/tools.js';
import { chatRequestSchema, dashboardPromptSchema, dashboardUpdateSchema, type ChatResponse } from './shared/contracts.js';

const app = express();
app.use(cors({ origin: config.corsOrigin }));
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

app.get('/api/health', async (_req, res) => {
  const [modelService, mcp] = await Promise.all([probeModel(), probeMcp()]);
  res.json({
    ok: modelService.ok && modelService.modelAvailable && mcp.ok,
    model: config.model,
    provider: config.provider,
    mode: 'synthetic-read-only-demo',
    toolRuntime: 'local-agent',
    services: { model: modelService, mcp },
  });
});

app.post('/api/chat', async (req: Request, res: Response) => {
  const body = req.body ?? {};
  const requestId = res.locals.requestId;
  const fail = (status: number, message: string, error: unknown) => {
    console.error(JSON.stringify({ requestId, error: error instanceof Error ? error.message : String(error) }));
    return res.status(status).json({ error: `${message}: ${error instanceof Error ? error.message : 'unexpected error'}`, requestId });
  };

  if (body.dashboardPrompt !== undefined) {
    const parsed = dashboardPromptSchema.safeParse(body.dashboardPrompt);
    if (!parsed.success) return res.status(400).json({ error: 'Enter an additional prompt for the briefing.' });
    try {
      return res.json(await runBankingChat([], parsed.data));
    } catch (error) {
      return fail(503, 'Could not apply the prompt', error);
    }
  }

  if (body.dashboardUpdate !== undefined) {
    const parsed = dashboardUpdateSchema.safeParse(body.dashboardUpdate);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid dashboard input values.' });
    try {
      const widget = await updateAgentDashboard(parsed.data.scenario, parsed.data.inputs, parsed.data.prompt);
      const response: ChatResponse = { answer: 'Updated the dashboard using your assumptions.', widget, widgets: [widget], model: config.model, toolInvoked: true };
      return res.json(response);
    } catch (error) {
      return fail(400, 'Could not update the dashboard', error);
    }
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid chat request.' });
  try {
    return res.json(await runBankingChat(parsed.data.messages));
  } catch (error) {
    return fail(503, 'Banking request failed', error);
  }
});

// Malformed JSON and oversized bodies.
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ error: 'Request body is not valid JSON.' });
  if (error?.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large.' });
  next(error);
});

const port = Number(process.env.PORT ?? config.port);
const server = app.listen(port, '0.0.0.0', () => console.log(`LocalBank API listening on 0.0.0.0:${port}`));
const shutdown = () => server.close(() => void closeBankMcpClient().finally(() => process.exit(0)));
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
