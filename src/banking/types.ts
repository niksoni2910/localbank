export type CustomerSegment = 'Affluent' | 'Salaried' | 'Self-Employed' | 'Young Professional' | 'Retiree';
export type KycStatus = 'Verified' | 'Pending Review' | 'Expired';
export type TransactionChannel = 'UPI' | 'Card' | 'NEFT' | 'IMPS' | 'ATM' | 'Auto-Debit';
export type BankingDashboardScenario = 'portfolio-summary' | 'customer-review' | 'risk-audit' | 'cross-sell-growth';

export interface BankBranch {
  branchId: string;
  branchName: string;
  city: string;
  region: 'North' | 'South' | 'East' | 'West';
  ifsc: string;
  manager: string;
}

export interface CustomerAccount {
  id: string;
  type: string;
  masked: string;
  balance: number;
  currency: 'INR';
  branchId: string;
}

export interface CustomerCard {
  id: string;
  name: string;
  masked: string;
  status: string;
  creditLimit?: number;
  available?: number;
  dueDate?: string;
  outstanding?: number;
  dailyLimit?: number;
  usedToday?: number;
}

export interface CustomerTransaction {
  date: string;
  time: string;
  merchant: string;
  category: string;
  amount: number;
  account: string;
  accountId?: string;
  channel?: TransactionChannel;
  status: 'Completed' | 'Disputed';
  reference: string;
}

export interface CustomerFixedDeposit {
  id: string;
  principal: number;
  rate: number;
  tenureMonths: number;
  maturityAmount: number;
  maturityDate: string;
  status: string;
}

export interface CustomerLoan {
  id: string;
  type: string;
  principalOutstanding: number;
  rate: number;
  emi: number;
  remainingMonths: number;
  nextDue: string;
}

export interface CustomerDispute {
  id: string;
  merchant: string;
  amount: number;
  filed: string;
  status: string;
  estimatedResolution: string;
  reason: string;
}

export interface CustomerRecord {
  customerId: string;
  customerName: string;
  branchId: string;
  city: string;
  segment: CustomerSegment;
  relationshipYears: number;
  monthlyIncome: number;
  monthlyFixedExpenses: number;
  monthlyVariableSpend: number;
  kyc: { status: KycStatus; lastUpdated: string; nextReview: string; pendingItems: string[] };
  accounts: CustomerAccount[];
  cards: CustomerCard[];
  transactions: CustomerTransaction[];
  spending: { category: string; amount: number }[];
  fd: CustomerFixedDeposit[];
  loans: CustomerLoan[];
  disputes: CustomerDispute[];
  engagementScore: number; // 0-100
}
