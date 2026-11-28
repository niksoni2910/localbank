import type { Widget } from '../shared/contracts.js';
import { makeBar, money, pct, printKeyValueCard, printTable } from './format.js';

export function renderCustomerWidget(widget: Widget): boolean {
  switch (widget.widget) {
    case 'customer360': {
      const kyc = (widget.kyc ?? {}) as Record<string, unknown>;
      const flags = Array.isArray(widget.riskFlags) && widget.riskFlags.length ? (widget.riskFlags as string[]).join(' · ') : 'None';
      const opps = Array.isArray(widget.opportunities) && widget.opportunities.length ? (widget.opportunities as string[]).join(' · ') : 'None';
      printKeyValueCard(`Customer 360 · ${String(widget.customerName)} (${String(widget.customerId)})`, [
        ['Home Branch', `${String(widget.branchName ?? '—')} (${String(widget.branchId ?? '—')}) · ${String(widget.ifsc ?? '')}`],
        ['Segment & City', `${String(widget.segment)} · ${String(widget.city)} (${String(widget.relationshipYears)}y)`],
        ['Monthly Income', money(widget.monthlyIncome)],
        ['Total Deposits', `${money(widget.totalBalance)} across ${String(widget.accountCount ?? 0)} account(s)`],
        ['Fixed Deposits', money(widget.totalFdPrincipal)],
        ['Loans Outstanding', `${money(widget.totalLoanOutstanding)} (EMI ${money(widget.totalMonthlyEmi)}/mo)`],
        ['FOIR / Card Util', `${pct(widget.foirPercent)} FOIR · ${pct(widget.creditUtilizationPercent)} utilization`],
        ['KYC & Engagement', `${String(kyc.status ?? '—')} · Score ${String(widget.engagementScore ?? 0)}/100`],
        ['Risk Flags', flags],
        ['Opportunities', opps],
      ]);
      const accts = Array.isArray(widget.accounts) ? (widget.accounts as Record<string, unknown>[]) : [];
      if (accts.length) {
        printTable(`Deposit Accounts · ${String(widget.customerName)}`, [
          { header: 'ID', key: 'id' },
          { header: 'Account Type', key: 'type' },
          { header: 'Number', key: 'masked' },
          { header: 'Branch', key: 'branch' },
          { header: 'Balance', key: 'balance', align: 'right' },
        ], accts.map(a => ({
          id: String(a.id ?? ''),
          type: String(a.type ?? ''),
          masked: String(a.masked ?? ''),
          branch: String(a.branchId ?? widget.branchId ?? ''),
          balance: money(a.balance),
        })));
      }
      const txs = Array.isArray(widget.recentTransactions) ? (widget.recentTransactions as Record<string, unknown>[]) : [];
      if (txs.length) {
        printTable(`Recent Activity · ${String(widget.customerName)}`, [
          { header: 'Date', key: 'date' },
          { header: 'Merchant', key: 'merchant', maxWidth: 24 },
          { header: 'Category', key: 'category' },
          { header: 'Amount', key: 'amount', align: 'right' },
          { header: 'Status', key: 'status' },
          { header: 'Ref', key: 'ref' },
        ], txs.map(t => {
          const amt = Number(t.amount ?? 0);
          return {
            date: String(t.date ?? ''),
            merchant: String(t.merchant ?? ''),
            category: String(t.category ?? ''),
            amount: `${amt >= 0 ? '+' : '-'}${money(Math.abs(amt))}`,
            status: String(t.status ?? ''),
            ref: String(t.reference ?? ''),
          };
        }));
      }
      return true;
    }

    case 'balance': {
      const accounts = Array.isArray(widget.accounts) ? (widget.accounts as Record<string, unknown>[]) : [];
      printTable(`Deposit Accounts · ${String(widget.customerName ?? widget.customerId ?? '')}`, [
        { header: 'ID', key: 'id' },
        { header: 'Account Type', key: 'type' },
        { header: 'Number', key: 'masked' },
        { header: 'Balance', key: 'balance', align: 'right' },
      ], accounts.map(a => ({
        id: String(a.id ?? ''),
        type: String(a.type ?? ''),
        masked: String(a.masked ?? ''),
        balance: money(a.balance),
      })), `Total Balance: ${money(widget.totalBalance)}`);
      return true;
    }

    case 'transactions': {
      const txs = Array.isArray(widget.transactions) ? (widget.transactions as Record<string, unknown>[]) : [];
      printTable(`Transactions (${txs.length} shown · ${String(widget.scope ?? 'Portfolio')})`, [
        { header: 'Date', key: 'date' },
        { header: 'Customer', key: 'customer', maxWidth: 18 },
        { header: 'Merchant', key: 'merchant', maxWidth: 22 },
        { header: 'Category', key: 'category' },
        { header: 'Channel', key: 'channel' },
        { header: 'Account', key: 'account' },
        { header: 'Amount', key: 'amount', align: 'right' },
        { header: 'Status', key: 'status' },
        { header: 'Ref', key: 'ref' },
      ], txs.map(t => {
        const amt = Number(t.amount ?? 0);
        return {
          date: String(t.date ?? ''),
          customer: String(t.customerName ?? t.customerId ?? '—'),
          merchant: String(t.merchant ?? ''),
          category: String(t.category ?? ''),
          channel: String(t.channel ?? 'Card'),
          account: String(t.account ?? '—'),
          amount: `${amt >= 0 ? '+' : '-'}${money(Math.abs(amt))}`,
          status: String(t.status ?? ''),
          ref: String(t.reference ?? ''),
        };
      }), widget.count != null ? `Total matching: ${String(widget.count)}` : undefined);
      return true;
    }

    case 'cards': {
      const cards = Array.isArray(widget.cards) ? (widget.cards as Record<string, unknown>[]) : [];
      printTable(`Cards Overview${widget.customerName ? ` · ${String(widget.customerName)}` : ''}`, [
        { header: 'Card', key: 'name' },
        { header: 'Number', key: 'masked' },
        { header: 'Status', key: 'status' },
        { header: 'Available / Used', key: 'avail', align: 'right' },
        { header: 'Limit / Outstanding', key: 'limit', align: 'right' },
      ], cards.map(c => ({
        name: String(c.name ?? ''),
        masked: String(c.masked ?? ''),
        status: String(c.status ?? ''),
        avail: c.available != null ? money(c.available) : money(c.usedToday),
        limit: c.creditLimit != null ? `${money(c.creditLimit)} (due ${money(c.outstanding)})` : money(c.dailyLimit),
      })));
      return true;
    }

    case 'fds': {
      const deposits = Array.isArray(widget.fixedDeposits) ? (widget.fixedDeposits as Record<string, unknown>[]) : [];
      printTable(`Fixed Deposits · ${String(widget.customerName ?? widget.customerId ?? '')}`, [
        { header: 'FD ID', key: 'id' },
        { header: 'Principal', key: 'principal', align: 'right' },
        { header: 'Rate', key: 'rate', align: 'right' },
        { header: 'Tenure', key: 'tenure', align: 'right' },
        { header: 'Maturity', key: 'maturity', align: 'right' },
        { header: 'Maturity Date', key: 'date' },
        { header: 'Status', key: 'status' },
      ], deposits.map(f => ({
        id: String(f.id ?? ''),
        principal: money(f.principal),
        rate: pct(f.rate),
        tenure: `${String(f.tenureMonths ?? 0)}m`,
        maturity: money(f.maturityAmount),
        date: String(f.maturityDate ?? ''),
        status: String(f.status ?? ''),
      })), `Total Principal: ${money(widget.totalPrincipal)} · Total Maturity: ${money(widget.totalMaturity)}`);
      return true;
    }

    case 'loans': {
      const loans = Array.isArray(widget.loans) ? (widget.loans as Record<string, unknown>[]) : [];
      printTable(`Loan Accounts · ${String(widget.customerName ?? widget.customerId ?? '')}`, [
        { header: 'Loan ID', key: 'id' },
        { header: 'Type', key: 'type' },
        { header: 'Outstanding', key: 'outstanding', align: 'right' },
        { header: 'Rate', key: 'rate', align: 'right' },
        { header: 'EMI/mo', key: 'emi', align: 'right' },
        { header: 'Remaining', key: 'rem', align: 'right' },
        { header: 'Next Due', key: 'due' },
      ], loans.map(l => ({
        id: String(l.id ?? ''),
        type: String(l.type ?? ''),
        outstanding: money(l.principalOutstanding),
        rate: pct(l.rate),
        emi: money(l.emi),
        rem: `${String(l.remainingMonths ?? 0)}m`,
        due: String(l.nextDue ?? ''),
      })), `Total Outstanding: ${money(widget.totalOutstanding)} · Total Monthly EMI: ${money(widget.totalMonthlyEmi)}`);
      return true;
    }

    case 'spending': {
      const categories = Array.isArray(widget.spending) ? (widget.spending as Record<string, unknown>[]) : [];
      const total = Number(widget.total ?? 0);
      const maxAmt = Math.max(...categories.map(s => Number(s.amount ?? 0)), 1);
      printTable(`Spending Breakdown · ${String(widget.scope ?? 'Portfolio')}`, [
        { header: 'Category', key: 'category' },
        { header: 'Amount', key: 'amount', align: 'right' },
        { header: 'Share', key: 'share', align: 'right' },
        { header: 'Distribution', key: 'bar' },
      ], categories.map(s => {
        const amt = Number(s.amount ?? 0);
        const share = total > 0 ? `${Math.round((amt / total) * 1000) / 10}%` : '0%';
        return {
          category: String(s.category ?? ''),
          amount: money(amt),
          share,
          bar: makeBar(amt, maxAmt),
        };
      }), `Total Spend: ${money(total)} · Top Category: ${String(widget.topCategory ?? '—')}`);
      return true;
    }

    case 'fd':
      printKeyValueCard('Fixed Deposit Projection', [
        ['Principal', money(widget.principal)],
        ['Annual Rate', pct(widget.annualRate)],
        ['Tenure', `${String(widget.months ?? 0)} months`],
        ['Maturity Value', money(widget.maturityAmount)],
        ['Interest Earned', money(widget.interestEarned)],
      ], String(widget.calculation ?? 'Illustrative simulation only.'));
      return true;

    case 'emi':
      printKeyValueCard('Loan EMI Projection', [
        ['Principal', money(widget.principal)],
        ['Annual Rate', pct(widget.annualRate)],
        ['Tenure', `${String(widget.months ?? 0)} months`],
        ['Monthly EMI', money(widget.monthlyEmi)],
        ['Total Interest', money(widget.totalInterest)],
        ['Total Payable', money(widget.totalPayable)],
      ]);
      return true;

    case 'eligibility':
      printKeyValueCard('Underwriting Affordability Simulation', [
        ['Monthly Income', money(widget.monthlyIncome)],
        ['Existing EMIs', money(widget.existingEmi)],
        ['Requested Loan', `${money(widget.requestedAmount)} (${String(widget.months)} months)`],
        ['Estimated New EMI', money(widget.estimatedEmi)],
        ['Simulated FOIR', pct(widget.estimatedFoirPercent)],
        ['Threshold Status', widget.indicative ? 'Within 50% indicative FOIR threshold' : 'Above 50% indicative FOIR threshold'],
      ], String(widget.note ?? ''));
      return true;

    case 'cashflow': {
      const rows = Array.isArray(widget.projection) ? (widget.projection as Record<string, unknown>[]) : [];
      printKeyValueCard(`${String(widget.months)}-Month Cash-Flow Summary`, [
        ['Starting Balance', money(widget.startingBalance)],
        ['Net Monthly Cash Flow', money(widget.netMonthlyCashFlow)],
        ['Projected Ending Balance', money(widget.endingBalance)],
        ['Lowest Projected Balance', money(widget.lowestProjectedBalance)],
      ]);
      printTable('Monthly Projection', [
        { header: 'Month', key: 'month', align: 'right' },
        { header: 'Income', key: 'income', align: 'right' },
        { header: 'Expenses', key: 'expenses', align: 'right' },
        { header: 'Net Flow', key: 'net', align: 'right' },
        { header: 'Projected Balance', key: 'balance', align: 'right' },
      ], rows.map(r => ({
        month: String(r.month ?? ''),
        income: money(r.income),
        expenses: money(r.expenses),
        net: money(r.netCashFlow),
        balance: money(r.projectedBalance),
      })));
      return true;
    }

    case 'debtPlan': {
      const std = (widget.standard ?? {}) as Record<string, unknown>;
      const acc = (widget.accelerated ?? {}) as Record<string, unknown>;
      printTable('Debt Payoff Comparison', [
        { header: 'Plan', key: 'plan' },
        { header: 'Months', key: 'months', align: 'right' },
        { header: 'Total Interest', key: 'interest', align: 'right' },
      ], [
        {
          plan: 'Standard payment',
          months: std.months == null ? 'Does not cover interest' : String(std.months),
          interest: std.totalInterest == null ? '—' : money(std.totalInterest),
        },
        {
          plan: `With +${money(widget.extraPayment)}/mo`,
          months: acc.months == null ? 'Does not cover interest' : String(acc.months),
          interest: acc.totalInterest == null ? '—' : money(acc.totalInterest),
        },
      ], `Saved: ${widget.interestSaved == null ? 'Unavailable' : money(widget.interestSaved)} · ${widget.monthsSaved == null ? 'Unavailable' : `${String(widget.monthsSaved)} months`}`);
      return true;
    }

    case 'savingsGoal':
      printKeyValueCard('Savings Advisory Plan', [
        ['Target Goal', money(widget.goalAmount)],
        ['Starting Savings', money(widget.currentSavings)],
        ['Timeline & Return', `${String(widget.months)} months @ ${pct(widget.annualRate)}`],
        ['Required Monthly Contribution', money(widget.monthlyContribution)],
        ['Estimated Growth', money(widget.estimatedGrowth)],
        ['Projected Value', money(widget.projectedValue)],
      ], String(widget.note ?? ''));
      return true;

    case 'kyc': {
      const pending = Array.isArray(widget.pendingItems) && widget.pendingItems.length ? (widget.pendingItems as string[]).join(', ') : 'None';
      printKeyValueCard(`KYC Profile${widget.customerName ? ` · ${String(widget.customerName)}` : ''}`, [
        ['Status', String(widget.status ?? '—')],
        ['Last Updated', String(widget.lastUpdated ?? '—')],
        ['Next Review', String(widget.nextReview ?? '—')],
        ['Pending Items', pending],
      ]);
      return true;
    }

    case 'disputes': {
      const disputes = Array.isArray(widget.disputes) ? (widget.disputes as Record<string, unknown>[]) : [];
      printTable('Dispute Tracker', [
        { header: 'Case ID', key: 'id' },
        { header: 'Customer', key: 'customer', maxWidth: 18 },
        { header: 'Merchant', key: 'merchant', maxWidth: 20 },
        { header: 'Amount', key: 'amount', align: 'right' },
        { header: 'Status', key: 'status', maxWidth: 26 },
        { header: 'Est. Resolution', key: 'est' },
      ], disputes.map(d => ({
        id: String(d.id ?? ''),
        customer: String(d.customerName ?? d.customerId ?? '—'),
        merchant: String(d.merchant ?? ''),
        amount: money(d.amount),
        status: String(d.status ?? ''),
        est: String(d.estimatedResolution ?? ''),
      })));
      return true;
    }

    default:
      return false;
  }
}
