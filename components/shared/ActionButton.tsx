import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
}) => {
  const baseClasses =
    "flex items-center transition-colors rounded-lg font-medium";
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-4 py-2 text-md w-full",
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    danger: "text-red-600 hover:text-red-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${className} ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
