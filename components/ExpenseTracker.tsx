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
  startingBudget: number | null;
  interval: Interval;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  startingBudget,
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
    totalBudget,
    categories,
  } = useExpenseTracker(startingBudget, interval);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header totalSpent={totalSpent} totalBudget={totalBudget} />
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

/*
 Things to do and clean up: 
 -refactor landing page so user can enter the max budget. 
 (cannnot and shouldn't change)
 -refactor budget form so that the user can set the budget per category (total budget of the categories shouldn't exceed total budget input on the lading page. )

 */
