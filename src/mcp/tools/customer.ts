import type { MCPServer } from 'mcp-use';
import { z } from 'zod';
import {
  getBalance,
  getCustomerProfile,
  getFixedDeposits,
  getLoans,
  getTransactions,
  resolveCustomer,
  searchCustomers,
} from '../../banking.js';
import { branchIdParam, customerIdParam, resultSchema, verifyAuthArg, withAuth } from '../shared.js';

export function registerCustomerTools(server: MCPServer) {
  server.tool({
    name: 'customer-profile',
    title: 'Customer 360 profile',
    description: 'Retrieve a complete 360-degree analytical view of one customer: home branch, segment, income, FOIR %, card utilization %, all accounts, cards, FDs, loans, KYC, disputes, recent transactions, risk flags, and cross-sell opportunities.',
    inputSchema: withAuth({ customerId: customerIdParam }),
    outputSchema: resultSchema,
    view: { name: 'customer-profile' },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic customer 360 profile.' }], structuredContent: { data: getCustomerProfile(args.customerId) } }; });

  server.tool({
    name: 'account-balance', title: 'Customer account balances', description: 'Retrieve all deposit accounts and balances for a synthetic customer.', inputSchema: withAuth({ customerId: customerIdParam }), outputSchema: resultSchema, view: { name: 'balance-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic customer account balances.' }], structuredContent: { data: getBalance(args.customerId) } }; });

  server.tool({
    name: 'recent-transactions', title: 'Customer & branch transactions', description: 'Inspect synthetic transactions across the portfolio, a branch, or a specific customer, filtered by category, status (Completed/Disputed), or minimum amount.',
    inputSchema: withAuth({
      customerId: customerIdParam.describe('Optional customer ID or name; omit to search across all customers or a branch'),
      branchId: branchIdParam,
      limit: z.number().int().min(1).max(50).default(12),
      category: z.string().optional(),
      status: z.enum(['Completed', 'Disputed']).optional(),
      minAmount: z.number().min(0).optional(),
    }),
    outputSchema: resultSchema, view: { name: 'transaction-table' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic transaction list.' }], structuredContent: { data: getTransactions(args.limit, args.category, args.customerId, args.status, args.minAmount, args.branchId) } }; });

  server.tool({
    name: 'card-overview', title: 'Customer cards overview', description: 'Show synthetic debit and credit card status, limits, and utilization for a customer.', inputSchema: withAuth({ customerId: customerIdParam }), outputSchema: resultSchema, view: { name: 'cards-summary' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => {
    verifyAuthArg(args);
    const customer = resolveCustomer(args.customerId);
    return { content: [{ type: 'text', text: 'Synthetic card overview.' }], structuredContent: { data: { customerId: customer.customerId, customerName: customer.customerName, cards: customer.cards } } };
  });

  server.tool({
    name: 'fixed-deposits', title: 'Customer fixed deposits', description: 'Retrieve existing active or maturing fixed deposits for a customer.', inputSchema: withAuth({ customerId: customerIdParam }), outputSchema: resultSchema, view: { name: 'fixed-deposits' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic customer fixed deposits.' }], structuredContent: { data: getFixedDeposits(args.customerId) } }; });

  server.tool({
    name: 'loan-accounts', title: 'Customer loan accounts', description: 'Retrieve existing active loans, outstanding principal, rates, and monthly EMIs for a customer.', inputSchema: withAuth({ customerId: customerIdParam }), outputSchema: resultSchema, view: { name: 'loan-accounts' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => { verifyAuthArg(args); return { content: [{ type: 'text', text: 'Synthetic customer loan accounts.' }], structuredContent: { data: getLoans(args.customerId) } }; });

  server.tool({
    name: 'kyc-status', title: 'Customer KYC status', description: 'Check synthetic KYC verification status and pending items for a customer.', inputSchema: withAuth({ customerId: customerIdParam }), outputSchema: resultSchema, view: { name: 'kyc-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => {
    verifyAuthArg(args);
    const customer = resolveCustomer(args.customerId);
    return { content: [{ type: 'text', text: 'Synthetic KYC status.' }], structuredContent: { data: { customerId: customer.customerId, customerName: customer.customerName, ...customer.kyc } } };
  });

  server.tool({
    name: 'dispute-tracker', title: 'Dispute tracker', description: 'Inspect open disputes for a customer or across all customers when customerId is omitted.',
    inputSchema: withAuth({ customerId: customerIdParam.describe('Optional customer ID or name; omit to list all open disputes across the portfolio') }),
    outputSchema: resultSchema, view: { name: 'dispute-card' }, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  }, async (args) => {
    verifyAuthArg(args);
    if (args.customerId) {
      const customer = resolveCustomer(args.customerId);
      return { content: [{ type: 'text', text: 'Synthetic customer disputes.' }], structuredContent: { data: { disputes: customer.disputes.map(d => ({ ...d, customerId: customer.customerId, customerName: customer.customerName })) } } };
    }
    const all = searchCustomers({ hasOpenDisputes: true }).customers.flatMap(c =>
      resolveCustomer(c.customerId).disputes.map(d => ({ ...d, customerId: c.customerId, customerName: c.customerName })),
    );
    return { content: [{ type: 'text', text: 'Portfolio-wide synthetic disputes.' }], structuredContent: { data: { disputes: all } } };
  });
}
