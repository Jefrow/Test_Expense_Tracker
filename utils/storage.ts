import type { UserData, SpendingPeriod } from "../types/UserData";
import type { Budget } from "../types/Budget";
import type { Expense } from "../types/Expense";
import type { Interval } from "../types/Interval";

const STORAGE_KEY = "expense_tracker_data";

const DEFAULT_USER_DATA: UserData = {
  income: 0,
  interval: "monthly",
  expenses: [],
  budgets: [],
  spendingHistory: [],
  createdAt: new Date().toISOString(),
  lastModified: new Date().toISOString(),
};

export const storageUtils = {
  // Load user data from localStorage
  loadData(): UserData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return DEFAULT_USER_DATA;
      }
      return JSON.parse(data) as UserData;
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      return DEFAULT_USER_DATA;
    }
  },

  // Save user data to localStorage
  saveData(data: UserData): void {
    try {
      const updatedData = {
        ...data,
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  },

  // Update partial user data
  updateData(updates: Partial<UserData>): void {
    const currentData = this.loadData();
    const updatedData = {
      ...currentData,
      ...updates,
      lastModified: new Date().toISOString(),
    };
    this.saveData(updatedData);
  },

  // Initialize with income and interval
  initialize(income: number, interval: Interval): void {
    const data: UserData = {
      ...DEFAULT_USER_DATA,
      income,
      interval,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    this.saveData(data);
  },

  // Check if user has initialized their data
  isInitialized(): boolean {
    const data = this.loadData();
    return data.income > 0;
  },

  // Expense operations
  addExpense(expense: Expense): void {
    const data = this.loadData();
    data.expenses = [expense, ...data.expenses];
    this.saveData(data);
  },

  updateExpense(expense: Expense): void {
    const data = this.loadData();
    data.expenses = data.expenses.map((e) =>
      e.id === expense.id ? expense : e
    );
    this.saveData(data);
  },

  deleteExpense(expenseId: string): void {
    const data = this.loadData();
    data.expenses = data.expenses.filter((e) => e.id !== expenseId);
    this.saveData(data);
  },

  // Budget operations
  setBudgets(budgets: Budget[]): void {
    this.updateData({ budgets });
  },

  // Spending history operations
  saveSpendingPeriod(period: SpendingPeriod): void {
    const data = this.loadData();
    const index = data.spendingHistory.findIndex((sp) => sp.id === period.id);

    if (index >= 0) {
      data.spendingHistory[index] = period;
    } else {
      data.spendingHistory.push(period);
    }

    this.saveData(data);
  },

  getSpendingHistory(): SpendingPeriod[] {
    const data = this.loadData();
    return data.spendingHistory.sort(
      (a, b) =>
        new Date(b.periodStart).getTime() - new Date(a.periodStart).getTime()
    );
  },

  // Clear all data (for testing/reset)
  clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing data from localStorage:", error);
    }
  },

  // Export data for backup
  exportData(): string {
    const data = this.loadData();
    return JSON.stringify(data, null, 2);
  },

  // Import data from backup
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as UserData;
      this.saveData(data);
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  },
};
