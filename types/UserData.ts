import type { Expense } from "./Expense";
import type { Budget } from "./Budget";
import type { Interval } from "./Interval";

export interface SpendingPeriod {
  id: string;
  periodStart: string;
  periodEnd: string;
  totalSpent: number;
  categoryBreakdown: {
    category: string;
    spent: number;
    budget: number;
  }[];
}

export interface UserData {
  income: number;
  interval: Interval;
  expenses: Expense[];
  budgets: Budget[];
  spendingHistory: SpendingPeriod[];
  createdAt: string;
  lastModified: string;
}
