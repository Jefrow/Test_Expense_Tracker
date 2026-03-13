import type { UserData, SpendingPeriod } from "../types/UserData";
import type { CategorySpending } from "../types/CategorySpending";
import { storageUtils } from "./storage";

/**
 * Calculate the start and end dates for the current period based on interval
 */
export const getCurrentPeriod = (
  interval: "weekly" | "bi-weekly" | "monthly",
): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (interval === "weekly") {
    // Start of week (Sunday)
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    // End of week (Saturday)
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (interval === "bi-weekly") {
    // Find which bi-weekly period we're in
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    );
    const biWeeklyPeriod = Math.floor(daysSinceStartOfYear / 14);

    start.setTime(startOfYear.getTime());
    start.setDate(startOfYear.getDate() + biWeeklyPeriod * 14);
    start.setHours(0, 0, 0, 0);

    end.setTime(start.getTime());
    end.setDate(start.getDate() + 13);
    end.setHours(23, 59, 59, 999);
  } else {
    // monthly
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    // Last day of month
    end.setMonth(now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
};

/**
 * Generate a unique ID for a spending period
 */
const generatePeriodId = (periodStart: string): string => {
  return `period_${periodStart}`;
};

/**
 * Save the current spending period to history
 */
export const saveCurrentPeriod = (
  userData: UserData,
  categorySpending: CategorySpending[],
): void => {
  const { start, end } = getCurrentPeriod(userData.interval);

  const totalSpent = categorySpending.reduce((sum, cat) => sum + cat.spent, 0);

  const period: SpendingPeriod = {
    id: generatePeriodId(start.toISOString()),
    periodStart: start.toISOString(),
    periodEnd: end.toISOString(),
    totalSpent,
    categoryBreakdown: categorySpending.map((cat) => ({
      category: cat.category,
      spent: cat.spent,
      budget: cat.budget,
    })),
  };

  storageUtils.saveSpendingPeriod(period);
};

/**
 * Check if a new period has started since the last save
 */
export const shouldSaveNewPeriod = (lastPeriodEnd: string | null): boolean => {
  if (!lastPeriodEnd) return true;

  const lastEnd = new Date(lastPeriodEnd);
  const now = new Date();

  return now > lastEnd;
};
