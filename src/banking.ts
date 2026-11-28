export * from './banking/types.js';
export { syntheticBranches, syntheticCustomers, demoCustomer } from './banking/data.js';
export { resolveBranch, resolveCustomer, computeCustomerMetrics } from './banking/metrics.js';
export {
  getBranchOverview,
  getPortfolioOverview,
  searchCustomers,
  getSegmentInsights,
  getRiskAndCompliance,
  getProductPenetration,
  getRegionalBreakdown,
  getLiquidityAndMaturities,
  getChurnAndRetention,
} from './banking/portfolio.js';
export {
  getCustomerProfile,
  getBalance,
  getFixedDeposits,
  getLoans,
  getTransactions,
  spendingInsights,
} from './banking/customer.js';
export {
  calculateFd,
  calculateEmi,
  loanEligibility,
  projectCashFlow,
  compareDebtPayoff,
  planSavingsGoal,
} from './banking/simulators.js';
export { getBankingDashboard } from './banking/dashboard.js';
