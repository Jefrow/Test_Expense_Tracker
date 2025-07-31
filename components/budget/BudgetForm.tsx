// src/components/budget/BudgetForm.tsx
import React from "react";
import FormInput from "../shared/FormInput";
import FormSelect from "../shared/FormSelect";
import ActionButton from "../shared/ActionButton";

interface BudgetFormProps {
  budget: {
    category: string;
    limit: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  categories: string[];
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  budget,
  onChange,
  onSubmit,
  onCancel,
  categories,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-4">Set Category Budget</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          value={budget.category}
          onChange={(value) => onChange("category", value)}
          options={[
            { value: "", label: "Select Category" },
            ...categories.map((cat) => ({ value: cat, label: cat })),
          ]}
        />
        <FormInput
          type="number"
          placeholder="Budget Limit"
          value={budget.limit}
          onChange={(value) => onChange("limit", value)}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <ActionButton onClick={onSubmit} variant="primary">
          Set Budget
        </ActionButton>
        <ActionButton variant="secondary" onClick={onCancel}>
          Cancel
        </ActionButton>
      </div>
    </div>
  );
};

export default BudgetForm;
