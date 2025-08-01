// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import type { Interval } from "../types/Interval";
import BudgetPage from "../pages/BudgetPage";

function App() {
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const [interval, setInterval] = useState<Interval>("monthly");

  const handleSetInitialBudget = (budget: number, interval: Interval) => {
    setTotalBudget(budget);
    setInterval(interval);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onSubmit={handleSetInitialBudget} />}
        />
        <Route
          path="/budget"
          element={
            <BudgetPage startingBudget={totalBudget} interval={interval} />
          } // You can pass props like `startingBudget` here later
        />
      </Routes>
    </Router>
  );
}

export default App;
