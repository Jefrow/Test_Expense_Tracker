// src/hooks/useExpenseTracker.ts
import { useState } from "react";
import type { Expense } from "../../types/Expense";
import type { Budget } from "../../types/Budget";
import type { CategorySpending } from "../../types/CategorySpending";
import type { Interval } from "../../types/Interval";

export const useExpenseTracker = (
  startingBudget: number | null,
  interval: Interval
) => {
  const defaultCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Other",
  ];

  const [budgets, setBudgets] = useState<Budget[]>(
    defaultCategories.map((category) => ({
      category,
      limit: 0,
    }))
  );

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);

  const [activeTab, setActiveTab] = useState<
    "expenses" | "budget" | "analytics"
  >("expenses");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const [budgetForm, setBudgetForm] = useState({
    category: "",
    limit: "",
  });

  const categories = budgets.map((b) => b.category);

  const categorySpending: CategorySpending[] = budgets.map((budget) => {
    const spent = expenses
      .filter((expense) => expense.category === budget.category)
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      category: budget.category,
      spent,
      budget: budget.limit,
      percentage: budget.limit > 0 ? (spent / budget.limit) * 100 : 0,
    };
  });

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSetInitialBudget = (budget: number, interval: Interval) => {
    setTotalBudget(budget);
    setInterval(interval);
  };

  const handleAddExpense = () => {
    setShowAddExpense(true);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      amount: expense.amount.toString(),
      description: expense.description,
      category: expense.category,
      date: expense.date,
    });
    setShowAddExpense(true);
  };

  const handleExpenseFormChange = (field: string, value: string) => {
    setExpenseForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleExpenseFormSubmit = () => {
    if (!expenseForm.amount || !expenseForm.description) return;
    const parsedAmount = parseFloat(expenseForm.amount);
    const newExpense: Expense = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      amount: parsedAmount,
      description: expenseForm.description,
      category: expenseForm.category,
      date: expenseForm.date,
    };

    setExpenses((prev) =>
      editingExpense
        ? prev.map((e) => (e.id === editingExpense.id ? newExpense : e))
        : [newExpense, ...prev]
    );

    setExpenseForm({
      amount: "",
      description: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddExpense(false);
    setEditingExpense(null);
  };

  const handleExpenseFormCancel = () => {
    setShowAddExpense(false);
    setEditingExpense(null);
    setExpenseForm({
      amount: "",
      description: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddBudget = () => {
    setShowAddBudget(true);
  };

  const handleBudgetFormChange = (field: string, value: string) => {
    setBudgetForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBudgetFormSubmit = () => {
    if (!budgetForm.category || !budgetForm.limit) return;
    const limit = parseFloat(budgetForm.limit);

    setBudgets((prev) => {
      const index = prev.findIndex((b) => b.category === budgetForm.category);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].limit = limit;
        return updated;
      } else {
        return [...prev, { category: budgetForm.category, limit }];
      }
    });

    setBudgetForm({ category: "", limit: "" });
    setShowAddBudget(false);
  };

  const handleBudgetFormCancel = () => {
    setShowAddBudget(false);
    setBudgetForm({ category: "", limit: "" });
  };

  return {
    // State
    expenses,
    budgets,
    activeTab,
    showAddExpense,
    showAddBudget,
    editingExpense,
    expenseForm,
    budgetForm,
    categories,
    categorySpending,
    totalSpent,
    totalBudget,

    // State setters
    setActiveTab,

    // Handlers
    handleAddExpense,
    handleEditExpense,
    handleExpenseFormChange,
    handleExpenseFormSubmit,
    handleExpenseFormCancel,
    handleDeleteExpense,
    handleAddBudget,
    handleBudgetFormChange,
    handleBudgetFormSubmit,
    handleBudgetFormCancel,
    handleSetInitialBudget,
  };
};
