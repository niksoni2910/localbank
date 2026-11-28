import type { MCPServer } from 'mcp-use';
import {
  getBranchOverview,
  getChurnAndRetention,
  getLiquidityAndMaturities,
  getPortfolioOverview,
  getProductPenetration,
  getRegionalBreakdown,
  getRiskAndCompliance,
  getSegmentInsights,
  searchCustomers,
  spendingInsights,
} from '../../banking.js';
import { branchIdParam, customerIdParam, kycEnum, resultSchema, segmentEnum, verifyAuthArg, withAuth } from '../shared.js';
import { z } from 'zod';

export function registerPortfolioTools(server: MCPServer) {
  server.tool({
    name: 'portfolio-overview',
    title: 'Portfolio overview',
    description: 'Aggregate portfolio KPIs across all synthetic branches & customers: branch count, customer count, account count, transaction count, total deposits, FD book, AUM, loan book, open disputes, KYC action count, average FOIR, and segment breakdown.',
    inputSchema: withAuth({}),
    outputSchema: resultSchema,
    view: { name: 'portfolio-overview' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Portfolio-wide synthetic analytics overview.' }], structuredContent: { data: getPortfolioOverview() } }; });

  server.tool({
    name: 'branch-overview',
    title: 'Bank branches & branch customers',
    description: 'List bank branches (IFSC, manager, city, region, customer count, account count, transaction count, deposits, FD book, AUM, loan book) and each branch\'s assigned customers. Pass branchId to inspect one specific branch.',
    inputSchema: withAuth({ branchId: branchIdParam }),
    outputSchema: resultSchema,
    view: { name: 'branch-overview' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic bank branch breakdown.' }], structuredContent: { data: getBranchOverview(args.branchId) } }; });

  server.tool({
    name: 'customer-search',
    title: 'Search & filter customers',
    description: 'Find synthetic customers by query (ID, name, city, branch), branchId, segment, KYC status, minimum deposit balance, open disputes, or risk flags (high-foir, high-utilization, kyc-pending, open-dispute, churn-risk).',
    inputSchema: withAuth({
      query: z.string().optional().describe('Optional search text matching customerId, customerName, branchId, city, or segment'),
      branchId: branchIdParam,
      segment: segmentEnum.optional(),
      kycStatus: kycEnum.optional(),
      minBalance: z.number().min(0).optional(),
      hasOpenDisputes: z.boolean().optional(),
      riskFlag: z.enum(['high-foir', 'high-utilization', 'kyc-pending', 'open-dispute', 'churn-risk']).optional(),
    }),
    outputSchema: resultSchema,
    view: { name: 'customer-search' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async ({ _auth, ...filters }) => { verifyAuthArg({ _auth }); return { content: [{ type: 'text', text: 'Filtered synthetic customer cohort.' }], structuredContent: { data: searchCustomers(filters) } }; });

  server.tool({
    name: 'segment-insights',
    title: 'Segment & cohort insights',
    description: 'Surface analytical insights across all customers or a specific segment: risk alerts, growth/cross-sell opportunities, engagement score, and top spending categories.',
    inputSchema: withAuth({ segment: segmentEnum.optional() }),
    outputSchema: resultSchema,
    view: { name: 'segment-insights' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic segment insights.' }], structuredContent: { data: getSegmentInsights(args.segment) } }; });

  server.tool({
    name: 'risk-and-compliance',
    title: 'Risk & compliance audit',
    description: 'Audit customers across the portfolio for high FOIR, high credit card utilization, pending/expired KYC, and open disputes.',
    inputSchema: withAuth({
      foirThreshold: z.number().min(10).max(90).default(45).describe('FOIR percentage threshold to flag'),
      utilizationThreshold: z.number().min(10).max(100).default(70).describe('Credit card utilization percentage threshold to flag'),
    }),
    outputSchema: resultSchema,
    view: { name: 'risk-and-compliance' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic risk and compliance audit.' }], structuredContent: { data: getRiskAndCompliance(args.foirThreshold, args.utilizationThreshold) } }; });

  server.tool({
    name: 'product-penetration',
    title: 'Product penetration & cross-sell gaps',
    description: 'Analyze product adoption rates (deposits, credit cards, FDs, loans), average products per customer, and cross-sell whitespace across segments.',
    inputSchema: withAuth({ segment: segmentEnum.optional() }),
    outputSchema: resultSchema,
    view: { name: 'product-penetration' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic product penetration analytics.' }], structuredContent: { data: getProductPenetration(args.segment) } }; });

  server.tool({
    name: 'regional-breakdown',
    title: 'Regional & city performance',
    description: 'Compare customer count, deposits, FD book, total AUM, loan book, engagement score, and flagged accounts across cities.',
    inputSchema: withAuth({}),
    outputSchema: resultSchema,
    view: { name: 'regional-breakdown' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic regional performance analytics.' }], structuredContent: { data: getRegionalBreakdown() } }; });

  server.tool({
    name: 'liquidity-and-maturities',
    title: 'Liquidity & FD maturity pipeline',
    description: 'Analyze portfolio loan-to-deposit ratio, upcoming FD maturities, high-idle-cash FD sweep candidates, and low-liquidity-buffer customers.',
    inputSchema: withAuth({}),
    outputSchema: resultSchema,
    view: { name: 'liquidity-and-maturities' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic liquidity and FD maturity pipeline.' }], structuredContent: { data: getLiquidityAndMaturities() } }; });

  server.tool({
    name: 'churn-and-retention',
    title: 'Churn risk & engagement matrix',
    description: 'Rank customers by engagement score and churn risk tier (High Risk, Watchlist, Healthy) with retention drivers and recommended RM actions.',
    inputSchema: withAuth({}),
    outputSchema: resultSchema,
    view: { name: 'churn-and-retention' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic churn and retention analytics.' }], structuredContent: { data: getChurnAndRetention() } }; });

  server.tool({
    name: 'spending-analytics',
    title: 'Spending analytics',
    description: 'Analyze spending breakdown by category for a single customer, a segment, or the entire portfolio.',
    inputSchema: withAuth({ customerId: customerIdParam, segment: segmentEnum.optional() }),
    outputSchema: resultSchema,
    view: { name: 'spending-chart' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic spending breakdown.' }], structuredContent: { data: spendingInsights(args.customerId, args.segment) } }; });
}
