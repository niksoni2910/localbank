import { z } from 'zod';

/** Contracts shared by the agent API and the frontend (the frontend imports types only). */

export const dashboardScenarios = ['portfolio-summary', 'customer-review', 'risk-audit', 'cross-sell-growth'] as const;
export const dashboardScenarioSchema = z.enum(dashboardScenarios);
export type DashboardScenario = z.infer<typeof dashboardScenarioSchema>;

export const employeeRoleEnum = z.enum(['hq_analyst', 'regional_head', 'branch_manager']);
export type EmployeeRole = z.infer<typeof employeeRoleEnum>;

export type EmployeeProfile = {
  employeeId: string;
  email: string;
  name: string;
  role: EmployeeRole;
  title: string;
};

export const loginRequestSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(8000),
  widget: z.record(z.string(), z.unknown()).nullable().optional(),
  widgets: z.array(z.record(z.string(), z.unknown())).max(15).optional(),
  createdAt: z.number().optional(),
  surface: z.enum(['web', 'cli']).optional(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  sessionId: z.string().trim().min(1).max(120).optional(),
  surface: z.enum(['web', 'cli']).default('web').optional(),
  message: z.string().trim().min(1).max(8000).optional(),
  messages: z.array(chatMessageSchema).max(50).optional(),
}).refine(
  data => Boolean(data.message?.trim() || data.messages?.length),
  { message: 'Provide either a message or messages array.' },
);

export const dashboardUpdateSchema = z.object({
  scenario: dashboardScenarioSchema,
  inputs: z.record(z.string(), z.number().finite()),
  prompt: z.string().max(2000).optional(),
  customerId: z.string().max(64).optional(),
  sessionId: z.string().trim().min(1).max(120).optional(),
  messageIndex: z.number().int().min(0).optional(),
});

export const dashboardPromptSchema = dashboardUpdateSchema.extend({
  prompt: z.string().trim().min(1).max(2000),
});
export type DashboardPromptRequest = z.infer<typeof dashboardPromptSchema>;

export const createSessionSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  surface: z.enum(['web', 'cli']).default('web'),
});

export type ChatSessionSummary = {
  id: string;
  employeeId: string;
  title: string;
  surface: 'web' | 'cli';
  messageCount: number;
  lastMessagePreview: string;
  createdAt: number;
  updatedAt: number;
};

export type ChatSessionRecord = ChatSessionSummary & {
  messages: ChatMessage[];
};

export const widgetKinds = [
  'portfolio', 'branches', 'customers', 'customer360', 'insights', 'risk',
  'penetration', 'regions', 'liquidity', 'retention',
  'balance', 'transactions', 'cards', 'fd', 'fds', 'emi', 'loans',
  'spending', 'eligibility', 'kyc', 'disputes', 'cashflow', 'debtPlan', 'savingsGoal', 'dashboard',
] as const;
export type WidgetKind = (typeof widgetKinds)[number];

/** A UI card. Tool-specific fields are carried alongside the discriminating `widget` kind. */
export type Widget = { widget: WidgetKind } & Record<string, unknown>;

export type ChatResponse = {
  sessionId?: string;
  answer: string;
  /** Last widget produced, kept for older clients. Prefer `widgets`. */
  widget: Widget | null;
  widgets: Widget[];
  model: string;
  toolInvoked: boolean;
};

export type ChatStreamEvent =
  | { type: 'widgets'; widgets: Widget[]; widget: Widget | null }
  | { type: 'delta'; text: string }
  | { type: 'done'; response: ChatResponse }
  | { type: 'error'; error: string; requestId?: string };
