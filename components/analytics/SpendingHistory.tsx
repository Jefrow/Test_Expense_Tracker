import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import type { SpendingPeriod } from "../../types/UserData";
import formatCurrency from "../../utils/formatCurrency";

interface SpendingHistoryProps {
  spendingHistory: SpendingPeriod[];
}

export const SpendingHistory = ({ spendingHistory }: SpendingHistoryProps) => {
  if (spendingHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>No spending history yet</p>
        <p className="text-sm mt-1">
          Historical data will appear here as you track expenses
        </p>
      </div>
    );
  }

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Spending History
      </h3>

      <div className="space-y-3">
        {spendingHistory.map((period, index) => {
          const previousPeriod = spendingHistory[index + 1];
          const change = previousPeriod
            ? calculateChange(period.totalSpent, previousPeriod.totalSpent)
            : null;

          return (
            <div
              key={period.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm text-gray-600">
                    {new Date(period.periodStart).toLocaleDateString()} -{" "}
                    {new Date(period.periodEnd).toLocaleDateString()}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mt-1">
                    {formatCurrency(period.totalSpent)}
                  </div>
                </div>

                {change !== null && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      change > 0
                        ? "bg-red-50 text-red-700"
                        : change < 0
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : change < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : null}
                    <span className="text-sm font-medium">
                      {change > 0 ? "+" : ""}
                      {change.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {period.categoryBreakdown.map((cat) => {
                  const percentage =
                    cat.budget > 0 ? (cat.spent / cat.budget) * 100 : 0;
                  const isOverBudget = percentage > 100;

                  return (
                    <div
                      key={cat.category}
                      className="bg-gray-50 rounded-md p-2"
                    >
                      <div className="text-xs font-medium text-gray-600 mb-1">
                        {cat.category}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-sm font-semibold ${
                            isOverBudget ? "text-red-600" : "text-gray-800"
                          }`}
                        >
                          {formatCurrency(cat.spent)}
                        </span>
                        <span className="text-xs text-gray-500">
                          / {formatCurrency(cat.budget)}
                        </span>
                      </div>
                      <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isOverBudget ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
