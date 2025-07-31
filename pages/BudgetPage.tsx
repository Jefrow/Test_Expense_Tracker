// src/pages/BudgetPage.tsx
import React from "react";
import ExpenseTracker from "../components/ExpenseTracker";
import type { Interval } from "../types/Interval";

interface BudgetPrageProps {
  startingBudget: number | null;
  interval: Interval;
}

// This page will eventually receive props or context like startingBudget & interval

const BudgetPage: React.FC<BudgetPrageProps> = ({
  startingBudget,
  interval,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <ExpenseTracker startingBudget={startingBudget} interval={interval} />
      </div>
    </div>
  );
};

export default BudgetPage;
