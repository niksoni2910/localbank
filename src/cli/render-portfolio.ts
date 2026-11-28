import type { Widget } from '../shared/contracts.js';
import { makeBar, money, pct, printKeyValueCard, printTable } from './format.js';

export function renderPortfolioWidget(widget: Widget): boolean {
  switch (widget.widget) {
    case 'portfolio': {
      printKeyValueCard(`Portfolio Overview (${String(widget.totalBranches ?? 6)} Branches · ${String(widget.totalCustomers ?? 0)} Customers)`, [
        ['Total Accounts & Txns', `${String(widget.totalAccounts ?? 0)} accounts · ${String(widget.totalTransactions ?? 0)} transactions`],
        ['Total AUM', money(widget.totalAum)],
        ['Deposit Balances', money(widget.totalDeposits)],
        ['Fixed Deposit Book', money(widget.totalFdBook)],
        ['Loan Book', money(widget.totalLoanBook)],
        ['Average FOIR', pct(widget.avgFoirPercent)],
        ['Open Disputes', String(widget.openDisputes ?? 0)],
        ['KYC Action Needed', String(widget.kycActionNeeded ?? 0)],
      ]);
      const segments = Array.isArray(widget.segments) ? (widget.segments as Record<string, unknown>[]) : [];
      printTable('Segment Breakdown', [
        { header: 'Segment', key: 'segment' },
        { header: 'Count', key: 'count', align: 'right' },
        { header: 'Deposits', key: 'deposits', align: 'right' },
        { header: 'FD Book', key: 'fdBook', align: 'right' },
        { header: 'Loan Book', key: 'loanBook', align: 'right' },
        { header: 'Avg Income', key: 'avgIncome', align: 'right' },
      ], segments.map(s => ({
        segment: String(s.segment ?? '—'),
        count: String(s.customers ?? 0),
        deposits: money(s.totalDeposits),
        fdBook: money(s.totalFdBook),
        loanBook: money(s.totalLoanBook),
        avgIncome: money(s.avgMonthlyIncome),
      })));
      return true;
    }

    case 'branches': {
      const branches = Array.isArray(widget.branches) ? (widget.branches as Record<string, unknown>[]) : [];
      printTable(`Bank Branches · ${String(widget.scope ?? 'All branches')} (${String(widget.branchCount ?? branches.length)} branches · ${String(widget.totalAccounts ?? 0)} accounts)`, [
        { header: 'Branch ID', key: 'id' },
        { header: 'Branch Name', key: 'name', maxWidth: 23 },
        { header: 'IFSC', key: 'ifsc' },
        { header: 'Manager', key: 'mgr', maxWidth: 16 },
        { header: 'Cust', key: 'cust', align: 'right' },
        { header: 'Accts', key: 'accts', align: 'right' },
        { header: 'Disp', key: 'disp', align: 'right' },
        { header: 'KYC', key: 'kyc', align: 'right' },
        { header: 'Total AUM', key: 'aum', align: 'right' },
        { header: 'Loans', key: 'loans', align: 'right' },
      ], branches.map(b => ({
        id: String(b.branchId ?? ''),
        name: String(b.branchName ?? ''),
        ifsc: String(b.ifsc ?? ''),
        mgr: String(b.manager ?? ''),
        cust: String(b.customerCount ?? 0),
        accts: String(b.accountCount ?? 0),
        disp: String(b.openDisputes ?? 0),
        kyc: String(b.kycActionNeeded ?? 0),
        aum: money(b.totalAum),
        loans: money(b.totalLoanBook),
      })));
      if (branches.length === 1) {
        const b = branches[0];
        const custs = Array.isArray(b.customers) ? (b.customers as Record<string, unknown>[]) : [];
        if (custs.length) {
          printTable(`Customers in ${String(b.branchName)} (${String(b.branchId)})`, [
            { header: 'ID', key: 'id' },
            { header: 'Customer', key: 'name' },
            { header: 'Segment', key: 'segment' },
            { header: 'Accounts', key: 'accts', align: 'right' },
            { header: 'Deposits', key: 'deposits', align: 'right' },
            { header: 'FOIR', key: 'foir', align: 'right' },
            { header: 'KYC', key: 'kyc' },
          ], custs.map(c => ({
            id: String(c.customerId ?? ''),
            name: String(c.customerName ?? ''),
            segment: String(c.segment ?? ''),
            accts: String(c.accountCount ?? 0),
            deposits: money(c.totalBalance),
            foir: pct(c.foirPercent),
            kyc: String(c.kycStatus ?? ''),
          })));
        }
      }
      return true;
    }

    case 'customers': {
      const customers = Array.isArray(widget.customers) ? (widget.customers as Record<string, unknown>[]) : [];
      printTable(`Customer Cohort (${String(widget.count ?? customers.length)} matched)`, [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name', maxWidth: 19 },
        { header: 'Segment', key: 'segment', maxWidth: 18 },
        { header: 'City', key: 'city', maxWidth: 12 },
        { header: 'Deposits', key: 'deposits', align: 'right' },
        { header: 'FOIR', key: 'foir', align: 'right' },
        { header: 'Util', key: 'util', align: 'right' },
        { header: 'KYC', key: 'kyc', maxWidth: 14 },
        { header: 'Flags / Opportunities', key: 'notes', maxWidth: 34 },
      ], customers.map(c => {
        const flags = Array.isArray(c.riskFlags) ? c.riskFlags as string[] : [];
        const opps = Array.isArray(c.opportunities) ? c.opportunities as string[] : [];
        const notes = [...flags.map(f => `! ${f}`), ...opps.map(o => `+ ${o}`)].join('; ') || '—';
        return {
          id: String(c.customerId ?? ''),
          name: String(c.customerName ?? ''),
          segment: String(c.segment ?? ''),
          city: String(c.city ?? ''),
          deposits: money(c.totalBalance),
          foir: pct(c.foirPercent),
          util: pct(c.creditUtilizationPercent),
          kyc: String(c.kycStatus ?? ''),
          notes,
        };
      }));
      return true;
    }

    case 'insights': {
      printKeyValueCard(`Segment Insights · ${String(widget.scope)}`, [
        ['Customers in Scope', String(widget.customerCount ?? 0)],
        ['Avg Engagement Score', `${String(widget.avgEngagementScore ?? 0)}/100`],
        ['Risk Alerts', String(Array.isArray(widget.riskAlerts) ? widget.riskAlerts.length : 0)],
        ['Growth Leads', String(Array.isArray(widget.growthOpportunities) ? widget.growthOpportunities.length : 0)],
      ]);
      const risks = Array.isArray(widget.riskAlerts) ? (widget.riskAlerts as Record<string, unknown>[]) : [];
      if (risks.length) {
        printTable('Risk Alerts', [
          { header: 'ID', key: 'id' },
          { header: 'Customer', key: 'name' },
          { header: 'Segment', key: 'segment' },
          { header: 'Flags', key: 'flags', maxWidth: 46 },
        ], risks.map(r => ({
          id: String(r.customerId ?? ''),
          name: String(r.customerName ?? ''),
          segment: String(r.segment ?? ''),
          flags: Array.isArray(r.flags) ? (r.flags as string[]).join(' · ') : '—',
        })));
      }
      const opps = Array.isArray(widget.growthOpportunities) ? (widget.growthOpportunities as Record<string, unknown>[]) : [];
      if (opps.length) {
        printTable('Growth & Cross-Sell Leads', [
          { header: 'ID', key: 'id' },
          { header: 'Customer', key: 'name' },
          { header: 'Segment', key: 'segment' },
          { header: 'Deposits', key: 'deposits', align: 'right' },
          { header: 'Opportunities', key: 'opps', maxWidth: 44 },
        ], opps.map(g => ({
          id: String(g.customerId ?? ''),
          name: String(g.customerName ?? ''),
          segment: String(g.segment ?? ''),
          deposits: money(g.totalBalance),
          opps: Array.isArray(g.opportunities) ? (g.opportunities as string[]).join(' · ') : '—',
        })));
      }
      const cats = Array.isArray(widget.topCategories) ? (widget.topCategories as Record<string, unknown>[]) : [];
      if (cats.length) {
        const maxCat = Math.max(...cats.map(c => Number(c.amount ?? 0)), 1);
        printTable('Top Spending Categories', [
          { header: 'Category', key: 'category' },
          { header: 'Amount', key: 'amount', align: 'right' },
          { header: 'Volume', key: 'bar' },
        ], cats.map(c => ({
          category: String(c.category ?? ''),
          amount: money(c.amount),
          bar: makeBar(Number(c.amount ?? 0), maxCat),
        })));
      }
      return true;
    }

    case 'risk': {
      const rows = Array.isArray(widget.flaggedCustomers) ? (widget.flaggedCustomers as Record<string, unknown>[]) : [];
      printTable(
        `Risk & Compliance Audit (${String(widget.flaggedCount ?? rows.length)}/${String(widget.totalCustomers ?? 0)} flagged · FOIR>=${String(widget.foirThreshold)}%, Util>=${String(widget.utilizationThreshold)}%)`,
        [
          { header: 'ID', key: 'id' },
          { header: 'Customer', key: 'name', maxWidth: 20 },
          { header: 'Segment', key: 'segment', maxWidth: 18 },
          { header: 'KYC', key: 'kyc', maxWidth: 14 },
          { header: 'FOIR', key: 'foir', align: 'right' },
          { header: 'Util', key: 'util', align: 'right' },
          { header: 'Audit Reasons', key: 'reasons', maxWidth: 42 },
        ],
        rows.map(r => ({
          id: String(r.customerId ?? ''),
          name: String(r.customerName ?? ''),
          segment: String(r.segment ?? ''),
          kyc: String(r.kycStatus ?? ''),
          foir: pct(r.foirPercent),
          util: pct(r.creditUtilizationPercent),
          reasons: Array.isArray(r.reasons) ? (r.reasons as string[]).join(' · ') : '—',
        })),
      );
      return true;
    }

    case 'penetration': {
      printKeyValueCard(`Product Penetration · ${String(widget.scope ?? 'Portfolio')}`, [
        ['Customers in Scope', String(widget.totalCustomers ?? 0)],
        ['Avg Products / Customer', String(widget.avgProductsPerCustomer ?? 0)],
      ]);
      const products = Array.isArray(widget.products) ? (widget.products as Record<string, unknown>[]) : [];
      printTable('Product Adoption', [
        { header: 'Product', key: 'product' },
        { header: 'Holders', key: 'holders', align: 'right' },
        { header: 'Penetration', key: 'rate', align: 'right' },
        { header: 'Adoption', key: 'bar' },
      ], products.map(p => ({
        product: String(p.product ?? ''),
        holders: String(p.holders ?? 0),
        rate: pct(p.penetrationPercent),
        bar: makeBar(Number(p.penetrationPercent ?? 0), 100),
      })));
      const bySeg = Array.isArray(widget.bySegment) ? (widget.bySegment as Record<string, unknown>[]) : [];
      if (bySeg.length > 1) {
        printTable('Penetration by Segment', [
          { header: 'Segment', key: 'segment' },
          { header: 'Count', key: 'count', align: 'right' },
          { header: 'Credit Card', key: 'cc', align: 'right' },
          { header: 'Fixed Deposit', key: 'fd', align: 'right' },
          { header: 'Loan', key: 'loan', align: 'right' },
        ], bySeg.map(s => ({
          segment: String(s.segment ?? ''),
          count: String(s.customers ?? 0),
          cc: pct(s.creditCardRate),
          fd: pct(s.fdRate),
          loan: pct(s.loanRate),
        })));
      }
      return true;
    }

    case 'regions': {
      const regions = Array.isArray(widget.regions) ? (widget.regions as Record<string, unknown>[]) : [];
      printTable(`Regional Performance (${String(widget.totalCities ?? regions.length)} cities · Top AUM: ${String(widget.topCityByAum ?? '—')})`, [
        { header: 'City', key: 'city' },
        { header: 'Cust', key: 'count', align: 'right' },
        { header: 'Total AUM', key: 'aum', align: 'right' },
        { header: 'Deposits', key: 'deposits', align: 'right' },
        { header: 'Loan Book', key: 'loans', align: 'right' },
        { header: 'Eng', key: 'eng', align: 'right' },
        { header: 'Alerts', key: 'alerts', align: 'right' },
      ], regions.map(r => ({
        city: String(r.city ?? ''),
        count: String(r.customers ?? 0),
        aum: money(r.totalAum),
        deposits: money(r.totalDeposits),
        loans: money(r.totalLoanBook),
        eng: `${String(r.avgEngagement ?? 0)}`,
        alerts: String(r.flaggedCustomers ?? 0),
      })));
      return true;
    }

    case 'liquidity': {
      printKeyValueCard('Liquidity & FD Maturity Pipeline', [
        ['Liquid Deposits', money(widget.totalLiquidDeposits)],
        ['Fixed Deposit Book', money(widget.totalFdBook)],
        ['Loan-to-Deposit Ratio', pct(widget.loanToDepositRatioPercent)],
        ['Maturing Soon FDs', String(widget.maturingSoonCount ?? 0)],
      ]);
      const maturities = Array.isArray(widget.fdMaturities) ? (widget.fdMaturities as Record<string, unknown>[]) : [];
      printTable('FD Maturity Schedule', [
        { header: 'FD ID', key: 'fdId' },
        { header: 'Customer', key: 'name', maxWidth: 19 },
        { header: 'Principal', key: 'principal', align: 'right' },
        { header: 'Rate', key: 'rate', align: 'right' },
        { header: 'Maturity', key: 'maturity', align: 'right' },
        { header: 'Date', key: 'date' },
        { header: 'Status', key: 'status' },
      ], maturities.map(f => ({
        fdId: String(f.fdId ?? ''),
        name: `${String(f.customerName ?? '')} (${String(f.customerId ?? '')})`,
        principal: money(f.principal),
        rate: pct(f.rate),
        maturity: money(f.maturityAmount),
        date: String(f.maturityDate ?? ''),
        status: String(f.status ?? ''),
      })));
      const sweeps = Array.isArray(widget.idleCashCandidates) ? (widget.idleCashCandidates as Record<string, unknown>[]) : [];
      if (sweeps.length) {
        printTable('Idle Cash FD Sweep Candidates', [
          { header: 'ID', key: 'id' },
          { header: 'Customer', key: 'name' },
          { header: 'Liquid Cash', key: 'cash', align: 'right' },
          { header: 'Suggested Sweep', key: 'sweep', align: 'right' },
          { header: 'Est. Yield Lift/yr', key: 'lift', align: 'right' },
        ], sweeps.map(s => ({
          id: String(s.customerId ?? ''),
          name: String(s.customerName ?? ''),
          cash: money(s.liquidBalance),
          sweep: money(s.suggestedFdSweep),
          lift: money(s.estimatedAnnualInterestGain),
        })));
      }
      return true;
    }

    case 'retention': {
      printKeyValueCard('Churn & Retention Matrix', [
        ['Avg Engagement Score', `${String(widget.avgEngagementScore ?? 0)}/100`],
        ['High Risk', String(widget.highRiskCount ?? 0)],
        ['Watchlist', String(widget.watchlistCount ?? 0)],
        ['Healthy', String(widget.healthyCount ?? 0)],
      ]);
      const rows = Array.isArray(widget.customers) ? (widget.customers as Record<string, unknown>[]) : [];
      printTable('Customer Retention Priority', [
        { header: 'ID', key: 'id' },
        { header: 'Customer', key: 'name', maxWidth: 19 },
        { header: 'Tier', key: 'tier' },
        { header: 'Eng', key: 'eng', align: 'right' },
        { header: 'AUM', key: 'aum', align: 'right' },
        { header: 'Drivers', key: 'drivers', maxWidth: 30 },
        { header: 'Recommended RM Action', key: 'action', maxWidth: 34 },
      ], rows.map(c => ({
        id: String(c.customerId ?? ''),
        name: String(c.customerName ?? ''),
        tier: String(c.tier ?? ''),
        eng: String(c.engagementScore ?? 0),
        aum: money(c.totalAum),
        drivers: Array.isArray(c.drivers) ? (c.drivers as string[]).join(' · ') : '—',
        action: String(c.recommendedAction ?? ''),
      })));
      return true;
    }

    default:
      return false;
  }
}
