// src/components/shared/FormInput.tsx
import React from "react";

interface FormInputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default FormInput;
