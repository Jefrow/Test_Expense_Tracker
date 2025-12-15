import React, { useState } from "react";
import { Wallet } from "lucide-react";
import toast from "react-hot-toast";
import type { Interval } from "../../types/Interval";
import ActionButton from "../shared/ActionButton";
import { storageUtils } from "../../utils/storage";

interface SetupCardProps {
  onComplete: () => void;
}

export const SetupCard: React.FC<SetupCardProps> = ({ onComplete }) => {
  const [income, setIncome] = useState("");
  const [interval, setInterval] = useState<Interval>("monthly");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericIncome = parseFloat(income);
    if (isNaN(numericIncome) || numericIncome <= 0) {
      toast.error("Please enter a valid income amount.");
      return;
    }

    storageUtils.initialize(numericIncome, interval);
    toast.success("Budget setup complete! Start adding your expenses.");
    onComplete();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-full">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome! Let's Setup Your Budget</h2>
          <p className="text-sm text-gray-600">Get started by entering your income and budget timeframe</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              This is just a reference - you can budget any amount
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Timeframe
            </label>
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value as Interval)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <ActionButton type="submit" variant="primary" className="justify-center">
          Start Tracking
        </ActionButton>
      </form>
    </div>
  );
};
