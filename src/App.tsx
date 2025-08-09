// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import type { Interval } from "../types/Interval";
import BudgetPage from "../pages/BudgetPage";

function App() {
  const [startingBudget, setStartingBudget] = useState<number>(0);
  const [interval, setInterval] = useState<Interval>("monthly");

  const handleSetupSubmit = (budget: number, selectedInterval: Interval) => {
    setStartingBudget(budget);
    setInterval(selectedInterval);
  };
  console.log(
    `starting budget in App.tsx: ${startingBudget} | interval from App.tsx: ${interval}`
  );

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
            <BudgetPage startingIncome={startingBudget} interval={interval} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

/*

**How Other Budget Tracker Apps Work compared to mine** 
-Budget Start: 
[x] User sets a total income or starting amount
-Categories: 
[] User assings funds to categories manually (YNAB)or automatically (Mint)
-Constraints: 
[] Budgeted total must equal total income(YNAB) or can be flexible (Mint
-Transactions: 
[] Users add expenses or connect to banks to auto-import. 
-Feedback: 
[] Real-time tracking of remaining per category and overall lef-to-budget. 
-Persistance: 
[] Budget and expense data saved to DB(localStorage, Firebase, or backend)
-UX: 
[] Guided onboarding, drag/drop, progres bars, and error handling (e.g. "over budget" warnings). 

**Things to do and fine tune** 

[x] Refactor landing page and expense tracker so that the the starting budget is the total budget and cannot be changed. 
[] Use localStorage to store:
  - totalBudget
  - budgets 
  - expense

(Better Feedback in UI)
[x] Add Progress bars per category
[x] A "Remaining" total for each category
[] Warning or red highlight if a category is over budget

(Onboarding Flow) 
[x] Auto-riderect to Budget tab only after they add at least one category
[] Show a toast or callout: "Set Category budgets before tracking expenses"

 */
