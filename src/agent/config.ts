import { z } from 'zod';

// Load a .env file from the working directory when present. Existing environment variables win.
try {
  process.loadEnvFile();
} catch {
  // No .env file: defaults and the process environment are used.
}

const schema = z.object({
  LLM_PROVIDER: z.enum(['cloudflare', 'ollama']).default('cloudflare'),
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_API_TOKEN: z.string().optional(),
  CLOUDFLARE_MODEL: z.string().min(1).default('@cf/google/gemma-4-26b-a4b-it'),
  OLLAMA_BASE_URL: z.url().default('http://127.0.0.1:11434'),
  OLLAMA_MODEL: z.string().min(1).default('gemma4:e4b'),
  OLLAMA_TIMEOUT_MS: z.coerce.number().int().positive().default(120_000),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  API_URL: z.url().default('http://127.0.0.1:3001'),
  MCP_URL: z.url().default('http://127.0.0.1:3000/mcp'),
  TOOL_CACHE_TTL_MS: z.coerce.number().int().min(0).default(60_000),
  CORS_ORIGIN: z.string().min(1).default('http://127.0.0.1:5173'),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(60),
  AUTH_SECRET: z.string().min(16).default('localbank-dev-cookie-secret-change-in-prod'),
  SESSION_TTL_HOURS: z.coerce.number().int().min(1).max(720).default(24),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid configuration:');
  for (const issue of parsed.error.issues) console.error(`  ${issue.path.join('.')}: ${issue.message}`);
  process.exit(1);
}

const env = parsed.data;

export const config = {
  provider: env.LLM_PROVIDER,
  cloudflareAccountId: env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareApiToken: env.CLOUDFLARE_API_TOKEN,
  cloudflareModel: env.CLOUDFLARE_MODEL,
  ollamaBase: env.OLLAMA_BASE_URL.replace(/\/+$/, ''),
  ollamaModel: env.OLLAMA_MODEL,
  model: env.LLM_PROVIDER === 'cloudflare' ? env.CLOUDFLARE_MODEL : env.OLLAMA_MODEL,
  ollamaTimeoutMs: env.OLLAMA_TIMEOUT_MS,
  port: env.API_PORT,
  apiUrl: env.API_URL.replace(/\/+$/, ''),
  mcpUrl: env.MCP_URL,
  toolCacheTtlMs: env.TOOL_CACHE_TTL_MS,
  corsOrigin: env.CORS_ORIGIN.replace(/\/+$/, ''),
  rateLimitPerMinute: env.RATE_LIMIT_PER_MINUTE,
  authSecret: env.AUTH_SECRET,
  sessionTtlMs: env.SESSION_TTL_HOURS * 60 * 60 * 1000,
} as const;
