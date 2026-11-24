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

async function ollamaChat(messages: ModelMessage[], tools?: ModelTool[]): Promise<ModelMessage> {
  let response: Response;
  try {
    response = await fetch(`${config.ollamaBase}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model: config.model, stream: false, messages, ...(tools?.length ? { tools } : {}) }),
      signal: AbortSignal.timeout(config.ollamaTimeoutMs),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(`Ollama did not answer within ${config.ollamaTimeoutMs} ms.`);
    }
    throw new Error('Could not reach Ollama. Is it running?');
  }
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}. Is Ollama running and the model available?`);
  const payload = (await response.json()) as { message?: ModelMessage };
  if (!payload.message) throw new Error('Ollama returned no message.');
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

async function cloudflareRequest(messages: ModelMessage[], tools?: ModelTool[], timeoutMs = config.ollamaTimeoutMs): Promise<ModelMessage> {
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
        messages,
        ...(tools?.length ? { tools, tool_choice: 'auto' } : {}),
        max_tokens: 2048,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(`Cloudflare Workers AI did not answer within ${timeoutMs} ms.`);
    }
    throw new Error('Could not reach Cloudflare Workers AI. Check your network connection.');
  }
  const payload = await response.json() as CloudflareResponse;
  if (!response.ok) throw new Error(payload.error?.message ?? payload.errors?.[0]?.message ?? `Cloudflare Workers AI HTTP ${response.status}. Check the account ID, API token permissions, and model availability.`);
  const message = payload.choices?.[0]?.message;
  if (!message) throw new Error('Cloudflare Workers AI returned no message.');
  return message;
}

export const modelChat = (messages: ModelMessage[], tools?: ModelTool[]) =>
  config.provider === 'cloudflare' ? cloudflareRequest(messages, tools) : ollamaChat(messages, tools);

export async function probeModel(): Promise<{ ok: boolean; modelAvailable: boolean; error?: string }> {
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
    return { ok: false, modelAvailable: false, error: error instanceof Error ? error.message : 'Workers AI is unavailable.' };
  }
}
