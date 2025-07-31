// src/components/layout/Navigation.tsx
import React from "react";
import TabButton from "../shared/TabButton";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: "expenses" | "budget" | "analytics") => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex border-b">
        <TabButton
          label="Expenses"
          active={activeTab === "expenses"}
          onClick={() => onTabChange("expenses")}
        />
        <TabButton
          label="Budget"
          active={activeTab === "budget"}
          onClick={() => onTabChange("budget")}
        />
        <TabButton
          label="Analytics"
          active={activeTab === "analytics"}
          onClick={() => onTabChange("analytics")}
        />
      </div>
    </div>
  );
};

export default Navigation;
