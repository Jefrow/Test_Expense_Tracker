// src/components/analytics/Analytics.tsx
import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import getStatusColor from "../../utils/getStatusColor";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface CategorySpending {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

interface AnalyticsProps {
  expenses: Expense[];
  categorySpending: CategorySpending[];
  totalSpent: number;
}

const Analytics: React.FC<AnalyticsProps> = ({
  expenses,
  categorySpending,
  totalSpent,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Spending Analytics
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No data to analyze yet. Start adding expenses to see insights!
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div>
            <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
            <div className="space-y-3">
              {categorySpending
                .filter((item) => item.spent > 0)
                .sort((a, b) => b.spent - a.spent)
                .map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{item.category}</span>
                    <div className="text-right">
                      <div className="font-bold">
                        {formatCurrency(item.spent)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {((item.spent / totalSpent) * 100).toFixed(1)}% of total
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Budget Status */}
          <div>
            <h3 className="text-lg font-medium mb-4">Budget Status</h3>
            <div className="space-y-3">
              {categorySpending.map((item) => (
                <div key={item.category} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.category}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        item.percentage
                      )}`}
                    >
                      {item.percentage > 100 ? "Over Budget" : "On Track"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.budget > 0 ? (
                      <>
                        Remaining:{" "}
                        {formatCurrency(Math.max(0, item.budget - item.spent))}
                      </>
                    ) : (
                      "No budget set"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
