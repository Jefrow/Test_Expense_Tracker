// src/components/layout/Header.tsx
import React from "react";
import { DollarSign, TrendingUp, PieChart, Wallet, Settings } from "lucide-react";
import StatCard from "../shared/StatCard";
import formatCurrency from "../../utils/formatCurrency";

interface HeaderProps {
  totalSpent: number;
  income: number;
  totalBudget: number;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  totalSpent,
  totalBudget,
  income,
  onSettingsClick,
}) => {
  const remaining = income - totalSpent;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Wallet className="h-8 w-8 text-blue-600 mr-3" />}
          label="Income"
          value={formatCurrency(income)}
          color="bg-blue-50"
        />
        <StatCard
          icon={<PieChart className="h-8 w-8 text-purple-600 mr-3" />}
          label="Total Budget"
          value={formatCurrency(totalBudget)}
          color="bg-purple-50"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-orange-600 mr-3" />}
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          color="bg-orange-50"
        />
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-green-600 mr-3" />}
          label="Remaining"
          value={formatCurrency(remaining)}
          color={remaining >= 0 ? "bg-green-50" : "bg-red-50"}
        />
      </div>
      {totalBudget > income && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Your total budget (${totalBudget.toFixed(2)}) exceeds your income (${income.toFixed(2)})
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
