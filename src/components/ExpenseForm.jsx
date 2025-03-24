import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    
    if (!name || isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid expense name and amount');
      return;
    }

    addExpense({
      id: Date.now(),
      name,
      amount: amountValue,
      note,
      completed: false,
      date: new Date().toISOString()
    });

    setName('');
    setAmount('');
    setNote('');
  };

  return (
    <div className="expense-form">
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Expense name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Short note (optional)"
        />
        <button type="submit">
          <i className="fas fa-plus"></i> Add
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;