// src/hooks/useExpenseTracker.ts
import { useState, useEffect } from "react";
import type { Expense } from "../../types/Expense";
import type { Budget } from "../../types/Budget";
import type { CategorySpending } from "../../types/CategorySpending";
import { storageUtils } from "../../utils/storage";
import toast from "react-hot-toast";

export const useExpenseTracker = () => {
  const defaultCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Other",
  ];

  const userData = storageUtils.loadData();

  const [budgets, setBudgets] = useState<Budget[]>(
    userData.budgets.length
      ? userData.budgets
      : defaultCategories.map((category) => ({
          category,
          limit: 0,
        })),
  );

  const [expenses, setExpenses] = useState<Expense[]>(userData.expenses || []);

  // Reload data when component mounts or when storage changes
  useEffect(() => {
    const data = storageUtils.loadData();
    setBudgets(
      data.budgets.length
        ? data.budgets
        : defaultCategories.map((category) => ({
            category,
            limit: 0,
          })),
    );
    setExpenses(data.expenses);
  }, []);

  const [activeTab, setActiveTab] = useState<
    "expenses" | "budget" | "analytics"
  >("budget");
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

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

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
    if (!expenseForm.amount || !expenseForm.description) {
      toast.error("Please fill in all fields");
      return;
    }
    const parsedAmount = parseFloat(expenseForm.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please Enter a valid amount greater than zero");
      return;
    }
    const newExpense: Expense = {
      id: editingExpense ? editingExpense.id : crypto.randomUUID(),
      amount: parsedAmount,
      description: expenseForm.description,
      category: expenseForm.category,
      date: expenseForm.date,
    };

    const updatedExpenses = editingExpense
      ? expenses.map((e) => (e.id === editingExpense.id ? newExpense : e))
      : [newExpense, ...expenses];

    setExpenses(updatedExpenses);
    storageUtils.updateData({ expenses: updatedExpenses });

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
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(updatedExpenses);
    storageUtils.updateData({ expenses: updatedExpenses });
  };

  const handleAddBudget = () => {
    setShowAddBudget(true);
  };

  const handleBudgetFormChange = (field: string, value: string) => {
    setBudgetForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBudgetFormSubmit = () => {
    if (!budgetForm.category || !budgetForm.limit) {
      toast.error("Please select a category and enter a budget limit");
      return;
    }
    const limit = parseFloat(budgetForm.limit);
    if (isNaN(limit) || limit <= 0) {
      toast.error("Invalid budget limit");
      return;
    }

    const index = budgets.findIndex((b) => b.category === budgetForm.category);
    let updatedBudgets: Budget[];

    if (index !== -1) {
      updatedBudgets = [...budgets];
      updatedBudgets[index].limit = limit;
    } else {
      updatedBudgets = [...budgets, { category: budgetForm.category, limit }];
    }

    setBudgets(updatedBudgets);
    storageUtils.updateData({ budgets: updatedBudgets });

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
  };
};
