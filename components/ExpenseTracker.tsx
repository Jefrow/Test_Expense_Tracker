// src/components/ExpenseTracker.tsx
import React from "react";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import ExpenseList from "./expenses/ExpenseList";
import BudgetManager from "./budget/BudgetManager";
import Analytics from "./analytics/Analytics";
import { useExpenseTracker } from "../src/hooks/useExpenseTracker";
import type { Interval } from "../types/Interval";

interface ExpenseTrackerProps {
  startingIncome: number;
  interval: Interval;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  startingIncome,
  interval,
}) => {
  const {
    activeTab,
    setActiveTab,
    expenses,
    showAddExpense,
    handleAddExpense,
    handleEditExpense,
    editingExpense,
    expenseForm,
    handleExpenseFormChange,
    handleExpenseFormSubmit,
    handleExpenseFormCancel,
    handleDeleteExpense,
    showAddBudget,
    handleAddBudget,
    budgetForm,
    handleBudgetFormChange,
    handleBudgetFormSubmit,
    handleBudgetFormCancel,
    categorySpending,
    totalSpent,
    categories,
    totalBudget,
  } = useExpenseTracker(startingIncome, interval);

  console.log(`Budget from landing Page : ${startingIncome}`);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header
          totalSpent={totalSpent}
          startingIncome={startingIncome}
          totalBudget={totalBudget}
        />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "expenses" && (
          <ExpenseList
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
            showForm={showAddExpense}
            formData={expenseForm}
            onFormChange={handleExpenseFormChange}
            onFormSubmit={handleExpenseFormSubmit}
            onFormCancel={handleExpenseFormCancel}
            isEditing={!!editingExpense}
            categories={categories}
            editingExpense={null}
          />
        )}

        {activeTab === "budget" && (
          <BudgetManager
            categorySpending={categorySpending}
            showForm={showAddBudget}
            onAddBudget={handleAddBudget}
            formData={budgetForm}
            onFormChange={handleBudgetFormChange}
            onFormSubmit={handleBudgetFormSubmit}
            onFormCancel={handleBudgetFormCancel}
            categories={categories}
          />
        )}

        {activeTab === "analytics" && (
          <Analytics
            expenses={expenses}
            categorySpending={categorySpending}
            totalSpent={totalSpent}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
