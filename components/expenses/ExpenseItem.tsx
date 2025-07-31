// src/components/expenses/ExpenseItem.tsx
import React from "react";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import ActionButton from "../shared/ActionButton";
import formatCurrency from "../../utils/formatCurrency";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseItemProps {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <Calendar className="h-5 w-5 text-gray-400" />
        <div>
          <p className="font-medium text-gray-900">{expense.description}</p>
          <p className="text-sm text-gray-500">
            {expense.category} • {expense.date}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-lg font-bold text-red-600">
          {formatCurrency(expense.amount)}
        </span>
        <ActionButton variant="danger" size="sm" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </ActionButton>
        <ActionButton variant="danger" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </ActionButton>
      </div>
    </div>
  );
};

export default ExpenseItem;
