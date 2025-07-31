// src/components/budget/BudgetManager.tsx
import React from "react";
import ActionButton from "../shared/ActionButton";
import BudgetForm from "./BudgetForm";
import BudgetProgressCard from "./BudgetProgressCard";
import { PlusCircle } from "lucide-react";

interface CategorySpending {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
}

interface BudgetManagerProps {
  categorySpending: CategorySpending[];
  showForm: boolean;
  onAddBudget: () => void;
  formData: {
    category: string;
    limit: string;
  };
  onFormChange: (field: string, value: string) => void;
  onFormSubmit: () => void;
  onFormCancel: () => void;
  categories: string[];
}

const BudgetManager: React.FC<BudgetManagerProps> = ({
  categorySpending,
  showForm,
  onAddBudget,
  formData,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  categories,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Budget Management</h2>
        <ActionButton onClick={onAddBudget}>
          <PlusCircle className="h-5 w-5 mr-2" />
          Set Budget
        </ActionButton>
      </div>

      {showForm && (
        <BudgetForm
          budget={formData}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          categories={categories}
        />
      )}

      <div className="space-y-4">
        {categorySpending.map((item) => (
          <BudgetProgressCard key={item.category} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BudgetManager;
