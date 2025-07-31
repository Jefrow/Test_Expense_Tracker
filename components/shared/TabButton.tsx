// src/components/shared/TabButton.tsx
import React from "react";

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium ${
        active ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
