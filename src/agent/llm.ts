import { config } from './config.js';

export type ModelToolCall = { id?: string; function?: { name?: string; arguments?: unknown } };
export type ModelMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string;
  tool_calls?: ModelToolCall[];
  tool_call_id?: string;
  name?: string;
};
export type ModelTool = { type: 'function'; function: { name: string; description: string; parameters: unknown } };
export type ModelChatOptions = { signal?: AbortSignal; onDelta?: (text: string) => void };

function buildTimeoutSignal(timeoutMs: number, signal?: AbortSignal) {
  const timeout = AbortSignal.timeout(timeoutMs);
  return signal ? AbortSignal.any([signal, timeout]) : timeout;
}

function normalizeJsonArguments(raw: unknown): string {
  let candidate: unknown = raw;
  for (let depth = 0; depth < 2 && typeof candidate === 'string'; depth++) {
    const trimmed = candidate.trim().replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, '$1').trim();
    if (!trimmed) return '{}';
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return JSON.stringify(parsed);
      }
      candidate = parsed;
    } catch {
      return '{}';
    }
  }
  if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
    return JSON.stringify(candidate);
  }
  return '{}';
}

function sanitizeCloudflareMessages(messages: ModelMessage[]): ModelMessage[] {
  return messages.map(msg => {
    if (msg.role !== 'assistant' || !msg.tool_calls?.length) return msg;
    return {
      role: 'assistant',
      content: msg.content ?? '',
      tool_calls: msg.tool_calls.map((tc, idx) => ({
        id: tc.id ?? `call_${idx}`,
        type: 'function',
        function: {
          name: tc.function?.name ?? '',
          arguments: normalizeJsonArguments(tc.function?.arguments),
        },
      })),
    };
  });
}

function describeFetchError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = (error as Error & { cause?: unknown }).cause;
  if (cause && typeof cause === 'object') {
    const { code, message } = cause as { code?: string; message?: string };
    const detail = [code, message].filter(Boolean).join(': ');
    if (detail) return `${error.message} (${detail})`;
  }
  return error.message;
}

async function readNdjsonStream(response: Response, onDelta?: (text: string) => void): Promise<ModelMessage> {
  if (!response.body) throw new Error('Ollama returned an empty stream.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let content = '';
  let toolCalls: ModelToolCall[] | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const chunk = JSON.parse(trimmed) as { message?: ModelMessage };
      const delta = chunk.message?.content;
      if (typeof delta === 'string' && delta.length > 0) {
        content += delta;
        onDelta?.(delta);
      }
      if (chunk.message?.tool_calls?.length) toolCalls = chunk.message.tool_calls;
    }
  }
  const trailing = buffer.trim();
  if (trailing) {
    const chunk = JSON.parse(trailing) as { message?: ModelMessage };
    const delta = chunk.message?.content;
    if (typeof delta === 'string' && delta.length > 0) {
      content += delta;
      onDelta?.(delta);
    }
    if (chunk.message?.tool_calls?.length) toolCalls = chunk.message.tool_calls;
  }
  return { role: 'assistant', content, ...(toolCalls?.length ? { tool_calls: toolCalls } : {}) };
}

async function readSseStream(response: Response, onDelta?: (text: string) => void): Promise<ModelMessage> {
  if (!response.body) throw new Error('Cloudflare Workers AI returned an empty stream.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let content = '';
  const toolCalls = new Map<number, { id?: string; function: { name: string; arguments: string } }>();

  const processLine = (rawLine: string) => {
    const line = rawLine.trim();
    if (!line.startsWith('data:')) return;
    const data = line.slice(5).trim();
    if (!data || data === '[DONE]') return;
    const chunk = JSON.parse(data) as {
      choices?: {
        delta?: {
          content?: string | null;
          tool_calls?: { index?: number; id?: string; function?: { name?: string; arguments?: string } }[];
        };
      }[];
    };
    const delta = chunk.choices?.[0]?.delta;
    if (!delta) return;
    if (typeof delta.content === 'string' && delta.content.length > 0) {
      content += delta.content;
      onDelta?.(delta.content);
    }
    for (const tc of delta.tool_calls ?? []) {
      const idx = tc.index ?? 0;
      const current = toolCalls.get(idx) ?? { function: { name: '', arguments: '' } };
      if (tc.id) current.id = tc.id;
      if (tc.function?.name) current.function.name += tc.function.name;
      if (tc.function?.arguments) current.function.arguments += tc.function.arguments;
      toolCalls.set(idx, current);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) processLine(line);
  }
  if (buffer.trim()) processLine(buffer);

  const assembledCalls: ModelToolCall[] = [...toolCalls.entries()]
    .sort(([a], [b]) => a - b)
    .map(([idx, tc]) => ({
      id: tc.id ?? `call_${idx}`,
      function: {
        name: tc.function.name,
        arguments: normalizeJsonArguments(tc.function.arguments),
      },
    }));
  return { role: 'assistant', content, ...(assembledCalls.length ? { tool_calls: assembledCalls } : {}) };
}

async function ollamaChat(messages: ModelMessage[], tools?: ModelTool[], stream = false, options?: ModelChatOptions): Promise<ModelMessage> {
  let response: Response;
  try {
    response = await fetch(`${config.ollamaBase}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model: config.model, stream, messages, ...(tools?.length ? { tools } : {}) }),
      signal: buildTimeoutSignal(config.ollamaTimeoutMs, options?.signal),
    });
  } catch (error) {
    if (options?.signal?.aborted) throw error;
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(`Ollama did not answer within ${config.ollamaTimeoutMs} ms.`);
    }
    throw new Error('Could not reach Ollama. Is it running?');
  }
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}. Is Ollama running and the model available?`);
  if (stream && !response.headers.get('content-type')?.includes('application/json')) {
    return readNdjsonStream(response, options?.onDelta);
  }
  const payload = (await response.json()) as { message?: ModelMessage };
  if (!payload.message) throw new Error('Ollama returned no message.');
  if (stream && payload.message.content) options?.onDelta?.(payload.message.content);
  return payload.message;
}

async function probeOllama(): Promise<{ ok: boolean; modelAvailable: boolean; error?: string }> {
  try {
    const response = await fetch(`${config.ollamaBase}/api/tags`, { signal: AbortSignal.timeout(2000) });
    if (!response.ok) return { ok: false, modelAvailable: false, error: `HTTP ${response.status}` };
    const payload = (await response.json()) as { models?: { name?: string }[] };
    const wanted = config.model.includes(':') ? config.model : `${config.model}:latest`;
    const modelAvailable = (payload.models ?? []).some(entry => entry.name === wanted);
    return { ok: true, modelAvailable, ...(modelAvailable ? {} : { error: `Run: ollama pull ${config.model}` }) };
  } catch {
    return { ok: false, modelAvailable: false, error: 'Ollama is not reachable.' };
  }
}

type CloudflareResponse = {
  choices?: { message?: ModelMessage }[];
  error?: { message?: string };
  errors?: { message?: string }[];
};

async function cloudflareRequest(messages: ModelMessage[], tools?: ModelTool[], stream = false, options?: ModelChatOptions): Promise<ModelMessage> {
  if (!config.cloudflareAccountId || !config.cloudflareApiToken) {
    throw new Error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to use Workers AI.');
  }
  let response: Response;
  try {
    response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.cloudflareAccountId}/ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${config.cloudflareApiToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: config.cloudflareModel,
        messages: sanitizeCloudflareMessages(messages),
        ...(tools?.length ? { tools, tool_choice: 'auto' } : {}),
        ...(stream ? { stream: true } : {}),
        max_tokens: 2048,
      }),
      signal: buildTimeoutSignal(config.ollamaTimeoutMs, options?.signal),
    });
  } catch (error) {
    if (options?.signal?.aborted) throw error;
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(`Cloudflare Workers AI did not answer within ${config.ollamaTimeoutMs} ms.`);
    }
    throw new Error(`Could not reach Cloudflare Workers AI: ${describeFetchError(error)}`);
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => ({})) as CloudflareResponse;
    throw new Error(payload.error?.message ?? payload.errors?.[0]?.message ?? `Cloudflare Workers AI HTTP ${response.status}. Check the account ID, API token permissions, and model availability.`);
  }
  if (stream && response.headers.get('content-type')?.includes('text/event-stream')) {
    return readSseStream(response, options?.onDelta);
  }
  const payload = await response.json() as CloudflareResponse;
  const message = payload.choices?.[0]?.message;
  if (!message) throw new Error('Cloudflare Workers AI returned no message.');
  if (stream && message.content) options?.onDelta?.(message.content);
  if (!message.tool_calls?.length) return message;
  return {
    ...message,
    tool_calls: message.tool_calls.map((tc, idx) => ({
      ...tc,
      id: tc.id ?? `call_${idx}`,
      function: {
        name: tc.function?.name ?? '',
        arguments: typeof tc.function?.arguments === 'string'
          ? (tc.function.arguments.trim() ? tc.function.arguments : '{}')
          : (tc.function?.arguments && typeof tc.function.arguments === 'object' ? JSON.stringify(tc.function.arguments) : '{}'),
      },
    })),
  };
}

export const modelChat = (messages: ModelMessage[], tools?: ModelTool[], options?: ModelChatOptions) =>
  config.provider === 'cloudflare' ? cloudflareRequest(messages, tools, false, options) : ollamaChat(messages, tools, false, options);

export const streamModelChat = (messages: ModelMessage[], tools?: ModelTool[], options?: ModelChatOptions) =>
  config.provider === 'cloudflare' ? cloudflareRequest(messages, tools, true, options) : ollamaChat(messages, tools, true, options);

export type ModelProbeResult = { ok: boolean; modelAvailable: boolean; error?: string };

const MODEL_PROBE_CACHE_TTL_MS = 60_000;
let modelProbeCache: { at: number; result: ModelProbeResult } | undefined;
let modelProbePromise: Promise<ModelProbeResult> | undefined;

async function runModelProbe(): Promise<ModelProbeResult> {
  if (config.provider === 'ollama') return probeOllama();
  if (!config.cloudflareAccountId || !config.cloudflareApiToken) {
    return { ok: false, modelAvailable: false, error: 'Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to use Workers AI.' };
  }
  try {
    const url = new URL(`https://api.cloudflare.com/client/v4/accounts/${config.cloudflareAccountId}/ai/models/search`);
    url.searchParams.set('search', config.cloudflareModel);
    const response = await fetch(url, {
      headers: { authorization: `Bearer ${config.cloudflareApiToken}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { ok: false, modelAvailable: false, error: `Cloudflare model check returned HTTP ${response.status}.` };
    const payload = await response.json() as { result?: unknown; success?: boolean };
    const modelAvailable = JSON.stringify(payload.result ?? '').includes(config.cloudflareModel);
    return { ok: payload.success === true && modelAvailable, modelAvailable, ...(!modelAvailable ? { error: `Workers AI model ${config.cloudflareModel} was not found or the token cannot access model metadata.` } : {}) };
  } catch (error) {
    return { ok: false, modelAvailable: false, error: describeFetchError(error) };
  }
}

export async function probeModel(): Promise<ModelProbeResult> {
  if (modelProbeCache && Date.now() - modelProbeCache.at < MODEL_PROBE_CACHE_TTL_MS) {
    return modelProbeCache.result;
  }
  if (!modelProbePromise) {
    modelProbePromise = runModelProbe()
      .then(result => {
        modelProbeCache = result.ok && result.modelAvailable ? { at: Date.now(), result } : undefined;
        return result;
      })
      .finally(() => {
        modelProbePromise = undefined;
      });
  }
  return modelProbePromise;
}
