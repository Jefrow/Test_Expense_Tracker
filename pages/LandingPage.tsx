// src/pages/LandingPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Interval } from "../types/Interval";
import ActionButton from "../components/shared/ActionButton";

interface LandingPageProps {
  onSubmit: (budget: number, interval: Interval) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSubmit }) => {
  const [budget, setBudget] = useState("");
  const [interval, setInterval] = useState<Interval>("monthly");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericBudget = parseFloat(budget);
    if (isNaN(numericBudget) || numericBudget <= 0) {
      alert("Please enter a valid starting budget.");
      return;
    }
    onSubmit(numericBudget, interval);
    navigate("/budget");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Set Your Budget
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Budget
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timeframe
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
          <ActionButton
            type="submit"
            size="lg"
            className="justify-center items-center"
            variant="primary"
          >
            Start Budgeting
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
