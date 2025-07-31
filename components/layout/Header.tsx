// src/components/layout/Header.tsx
import React from "react";
import { DollarSign, TrendingUp, PieChart } from "lucide-react";
import StatCard from "../shared/StatCard";
import formatCurrency from "../../utils/formatCurrency";

interface HeaderProps {
  totalSpent: number;
  totalBudget: number;
}

const Header: React.FC<HeaderProps> = ({ totalSpent, totalBudget }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-blue-600 mr-3" />}
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          color="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-green-600 mr-3" />}
          label="Total Budget"
          value={formatCurrency(totalBudget)}
          color="bg-green-50"
        />
        <StatCard
          icon={<PieChart className="h-8 w-8 text-purple-600 mr-3" />}
          label="Remaining"
          value={formatCurrency(totalBudget - totalSpent)}
          color="bg-purple-50"
        />
      </div>
    </div>
  );
};

export default Header;
