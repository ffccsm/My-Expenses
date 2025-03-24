import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const ExpenseItem = ({ expense, toggleComplete, deleteExpense }) => {
  return (
    <li className={`expense-item ${expense.completed ? 'completed' : ''}`}>
      <div className="expense-info">
        <div className="expense-name">{expense.name}</div>
        {expense.note && <div className="expense-note">{expense.note}</div>}
      </div>
      <div className="expense-amount">৳{expense.amount.toFixed(2)}</div>
      <div className="expense-actions">
        <button 
          className="complete-btn" 
          onClick={() => toggleComplete(expense.id)}
        >
          <FontAwesomeIcon icon={expense.completed ? faCheckCircle : faCircle} />
        </button>
        <button 
          className="delete-btn" 
          onClick={() => deleteExpense(expense.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;