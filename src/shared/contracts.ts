import { z } from 'zod';

/** Contracts shared by the agent API and the frontend (the frontend imports types only). */

export const dashboardScenarios = ['financial-health', 'credit-readiness', 'savings-plan', 'card-activity'] as const;
export const dashboardScenarioSchema = z.enum(dashboardScenarios);
export type DashboardScenario = z.infer<typeof dashboardScenarioSchema>;

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(8000),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).max(50),
});

export const dashboardUpdateSchema = z.object({
  scenario: dashboardScenarioSchema,
  inputs: z.record(z.string(), z.number().finite()),
  prompt: z.string().max(2000).optional(),
});

export const dashboardPromptSchema = dashboardUpdateSchema.extend({
  prompt: z.string().trim().min(1).max(2000),
});
export type DashboardPromptRequest = z.infer<typeof dashboardPromptSchema>;

export const widgetKinds = [
  'balance', 'transactions', 'cards', 'fd', 'emi', 'spending', 'eligibility', 'kyc',
  'disputes', 'cashflow', 'debtPlan', 'savingsGoal', 'dashboard',
] as const;
export type WidgetKind = (typeof widgetKinds)[number];

/** A UI card. Tool-specific fields are carried alongside the discriminating `widget` kind. */
export type Widget = { widget: WidgetKind } & Record<string, unknown>;

export type ChatResponse = {
  answer: string;
  /** Last widget produced, kept for older clients. Prefer `widgets`. */
  widget: Widget | null;
  widgets: Widget[];
  model: string;
  toolInvoked: boolean;
};
