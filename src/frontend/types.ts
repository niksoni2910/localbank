import { createContext } from 'react';
import { BadgeIndianRupee, Receipt, ShieldAlert, TrendingUp, Users } from 'lucide-react';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export type Msg = {
  role: 'user' | 'assistant';
  content: string;
  widget?: any;
  widgets?: any[];
  updatedAt?: number;
  updateError?: string;
};

export type PromptEntry = { id: string; prompt: string; scenario: string; at: number; ok: boolean };
export type DemoHint = { email: string; password: string; name: string; title: string };

export const money = (n: number) => '₹' + (n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

export const suggestions = [
  { icon: Users, label: 'Portfolio overview & insights', prompt: 'Give me a portfolio overview across all customer segments and highlight key trends and opportunities.', desc: 'AUM, segments, and cohort trends' },
  { icon: ShieldAlert, label: 'Risk, KYC & dispute audit', prompt: 'Audit the customer portfolio for high FOIR, high card utilization, pending KYC, and open disputes.', desc: 'Compliance flags and open cases' },
  { icon: TrendingUp, label: 'Cross-sell & growth leads', prompt: 'Find customers with high idle savings or maturing FDs and explain cross-sell opportunities.', desc: 'FD sweep, card upgrades, and advisory' },
  { icon: BadgeIndianRupee, label: 'Customer 360 & underwriting', prompt: 'Pull the Customer 360 profile for CUST-1042 and simulate affordability for a ₹5 lakh loan over 36 months at 11.5%.', desc: 'Profile metrics and FOIR check' },
  { icon: Receipt, label: 'Disputed & high-value activity', prompt: 'Analyze spending across the portfolio and show disputed or high-value transactions.', desc: 'Category spend and transaction flags' },
];

export const dashboardFields: Record<string, { key: string; label: string; step?: number }[]> = {
  'portfolio-summary': [{ key: 'transactionLimit', label: 'Transactions to show', step: 1 }],
  'customer-review': [
    { key: 'monthlyIncome', label: 'Monthly income' }, { key: 'existingEmi', label: 'Current EMIs' },
    { key: 'requestedAmount', label: 'Proposed loan amount' }, { key: 'months', label: 'Loan term (months)', step: 1 },
    { key: 'annualRate', label: 'Assumed rate (%)', step: 0.1 }, { key: 'transactionLimit', label: 'Transactions to show', step: 1 },
  ],
  'risk-audit': [
    { key: 'foirThreshold', label: 'FOIR alert threshold (%)', step: 1 },
    { key: 'utilizationThreshold', label: 'Card utilization threshold (%)', step: 1 },
    { key: 'transactionLimit', label: 'Transactions to show', step: 1 },
  ],
  'cross-sell-growth': [
    { key: 'minBalance', label: 'Min deposit balance' }, { key: 'fdPrincipal', label: 'Proposed FD amount' },
    { key: 'annualRate', label: 'Assumed FD rate (%)', step: 0.05 }, { key: 'months', label: 'FD tenure (months)', step: 1 },
  ],
};

export const HISTORY_KEY = 'localbank.promptHistory';
export const HISTORY_LIMIT = 50;

export function loadHistory(): PromptEntry[] {
  try {
    const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(value) ? value.slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
}

export const PromptHistoryContext = createContext<{ entries: PromptEntry[]; clear: () => void }>({ entries: [], clear: () => {} });

export const scenarioLabels: Record<string, string> = {
  'portfolio-summary': 'Portfolio intelligence',
  'customer-review': 'Customer 360 review',
  'risk-audit': 'Risk & compliance audit',
  'cross-sell-growth': 'Growth & cross-sell',
};
