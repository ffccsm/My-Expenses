import React, { useState } from 'react';

const BudgetCard = ({ monthlyBudget, setBudget, totalSpent, remaining }) => {
  const [budgetInput, setBudgetInput] = useState(monthlyBudget);

  const handleSetBudget = () => {
    const budgetValue = parseFloat(budgetInput);
    if (!isNaN(budgetValue)) {
      setBudget(budgetValue);
    }
  };

  const getRemainingColor = () => {
    if (monthlyBudget <= 0) return '';
    if (remaining < 0) return 'danger';
    if (remaining < monthlyBudget * 0.2) return 'warning';
    return 'success';
  };

  return (
    <>
      <div className="budget-card">
        <h3>Monthly Budget</h3>
        <div className="amount-input">
          <span>৳</span>
          <input 
            type="number" 
            value={budgetInput || ''}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Enter budget"
          />
          <button onClick={handleSetBudget}>Set</button>
        </div>
      </div>
      <div className="budget-summary">
        <div className="summary-card">
          <h4>Total Spent</h4>
          <p>৳{totalSpent.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h4>Remaining</h4>
          <p className={getRemainingColor()}>৳{remaining.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

export default BudgetCard;