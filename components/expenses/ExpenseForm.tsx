// src/components/expenses/ExpenseForm.tsx
import React from "react";
import FormInput from "../shared/FormInput";
import FormSelect from "../shared/FormSelect";
import ActionButton from "../shared/ActionButton";

interface ExpenseFormProps {
  expense: {
    amount: string;
    description: string;
    category: string;
    date: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
  categories: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  categories,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-4">
        {isEditing ? "Edit Expense" : "Add New Expense"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(value) => onChange("amount", value)}
        />
        <FormInput
          type="text"
          placeholder="Description"
          value={expense.description}
          onChange={(value) => onChange("description", value)}
        />
        <FormSelect
          value={expense.category}
          onChange={(value) => onChange("category", value)}
          options={categories.map((cat) => ({ value: cat, label: cat }))}
        />
        <FormInput
          type="date"
          value={expense.date}
          onChange={(value) => onChange("date", value)}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <ActionButton onClick={onSubmit}>
          {isEditing ? "Update" : "Add"} Expense
        </ActionButton>
        <ActionButton variant="secondary" onClick={onCancel}>
          Cancel
        </ActionButton>
      </div>
    </div>
  );
};

export default ExpenseForm;
