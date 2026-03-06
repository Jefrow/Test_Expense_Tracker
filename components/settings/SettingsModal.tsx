import React, { useState } from "react";
import { X, Settings as SettingsIcon } from "lucide-react";
import toast from "react-hot-toast";
import type { Interval } from "../../types/Interval";
import ActionButton from "../shared/ActionButton";
import { storageUtils } from "../../utils/storage";

interface SettingsModalProps {
  onClose: () => void;
  onUpdate: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onUpdate,
}) => {
  const userData = storageUtils.loadData();
  const [income, setIncome] = useState(userData.income.toString());
  const [interval, setInterval] = useState<Interval>(userData.interval);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericIncome = parseFloat(income);
    if (isNaN(numericIncome) || numericIncome <= 0) {
      toast.error("Please enter a valid income amount.");
      return;
    }

    storageUtils.updateData({
      income: numericIncome,
      interval,
    });

    toast.success("Settings updated successfully!");
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            />
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

          <div className="flex gap-2 pt-4">
            <ActionButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1 justify-center"
            >
              Cancel
            </ActionButton>
            <ActionButton
              type="submit"
              variant="primary"
              className="flex-1 justify-center"
            >
              Save Changes
            </ActionButton>
          </div>
        </form>
      </div>
    </div>
  );
};
