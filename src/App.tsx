// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import type { Interval } from "../types/Interval";
import BudgetPage from "../pages/BudgetPage";

function App() {
  const [startingBudget, setStartingBudget] = useState<number | null>(null);
  const [interval, setInterval] = useState<Interval>("monthly");

  const handleSetupSubmit = (budget: number, selectedInterval: Interval) => {
    setStartingBudget(budget);
    setInterval(selectedInterval);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onSubmit={handleSetupSubmit} />}
        />
        <Route
          path="/budget"
          element={
            <BudgetPage startingBudget={startingBudget} interval={interval} />
          } // You can pass props like `startingBudget` here later
        />
      </Routes>
    </Router>
  );
}

export default App;
