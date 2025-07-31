// src/components/expenses/ExpenseList.tsx
import React from "react";
import { PlusCircle } from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import ActionButton from "../shared/ActionButton";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseFormState {
  amount: string;
  description: string;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
  showForm: boolean;
  formData: ExpenseFormState;
  onFormChange: (field: string, value: string) => void;
  onFormSubmit: () => void;
  onFormCancel: () => void;
  isEditing: boolean;
  categories: string[];
  editingExpense: Expense | null;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  showForm,
  formData,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  isEditing,
  categories,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
        <ActionButton onClick={onAddExpense}>
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Expense
        </ActionButton>
      </div>

      {showForm && (
        <ExpenseForm
          expense={formData}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          isEditing={isEditing}
          categories={categories}
        />
      )}

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No expenses recorded yet. Add your first expense!
          </p>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={() => onEditExpense(expense)}
              onDelete={() => onDeleteExpense(expense.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
