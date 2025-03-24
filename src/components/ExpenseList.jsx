import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, filter, setFilter, toggleComplete, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      <div className="filter-options">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            data-filter={f}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <ul id="expenses-container">
        {expenses.length === 0 ? (
          <li className="empty-message">
            {filter === 'all' ? 'No expenses for this month' : 
             filter === 'pending' ? 'No pending expenses' : 'No completed expenses'}
          </li>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              toggleComplete={toggleComplete}
              deleteExpense={deleteExpense}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;