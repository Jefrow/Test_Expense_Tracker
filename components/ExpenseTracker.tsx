// src/components/ExpenseTracker.tsx
import React, { useState } from "react";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import ExpenseList from "./expenses/ExpenseList";
import BudgetManager from "./budget/BudgetManager";
import Analytics from "./analytics/Analytics";
import { SpendingHistory } from "./analytics/SpendingHistory";
import { SetupCard } from "./setup/SetupCard";
import { SettingsModal } from "./settings/SettingsModal";
import { useExpenseTracker } from "../src/hooks/useExpenseTracker";
import { storageUtils } from "../utils/storage";

const ExpenseTracker: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(storageUtils.isInitialized());
  const [showSettings, setShowSettings] = useState(false);
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
  } = useExpenseTracker();

  const userData = storageUtils.loadData();
  const spendingHistory = storageUtils.getSpendingHistory();

  const handleSetupComplete = () => {
    setIsInitialized(true);
  };

  const handleSettingsUpdate = () => {
    // Force re-render by reloading userData
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Show setup card if not initialized */}
        {!isInitialized && <SetupCard onComplete={handleSetupComplete} />}

        {/* Show tracker UI if initialized */}
        {isInitialized && (
          <>
            <Header
              totalSpent={totalSpent}
              income={userData.income}
              totalBudget={totalBudget}
              onSettingsClick={() => setShowSettings(true)}
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
          <div className="space-y-6">
            <Analytics
              expenses={expenses}
              categorySpending={categorySpending}
              totalSpent={totalSpent}
            />
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <SpendingHistory spendingHistory={spendingHistory} />
            </div>
          </div>
        )}
          </>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            onUpdate={handleSettingsUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
