// src/components/budget/BudgetProgressCard.tsx
import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import getStatusColor from "../../utils/getStatusColor";

interface CategorySpending {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

const BudgetProgressCard: React.FC<{ item: CategorySpending }> = ({ item }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-900">{item.category}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            item.percentage
          )}`}
        >
          {item.percentage.toFixed(0)}%
        </span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Spent: {formatCurrency(item.spent)}</span>
        <span>Budget: {formatCurrency(item.budget)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            item.percentage >= 90
              ? "bg-red-500"
              : item.percentage >= 70
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${Math.min(item.percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetProgressCard;
