import React, { useState, useEffect } from 'react';
import './App.css';
import './styles.css';
import BudgetCard from './components/BudgetCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import MonthSelector from './components/MonthSelector';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [expenses, setExpenses] = useState({});
  const [filter, setFilter] = useState('all');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthKey = `${currentYear}-${currentMonth}`;

  useEffect(() => {
    const savedBudget = localStorage.getItem(`budget-${monthKey}`);
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || {};
    
    if (savedBudget) setMonthlyBudget(parseFloat(savedBudget));
    setExpenses(savedExpenses);
  }, [monthKey]);

  const updateMonth = (newDate) => {
    setCurrentDate(newDate);
  };

  const setBudget = (budget) => {
    setMonthlyBudget(budget);
    localStorage.setItem(`budget-${monthKey}`, budget.toString());
  };

  const addExpense = (newExpense) => {
    const updatedExpenses = { ...expenses };
    if (!updatedExpenses[monthKey]) updatedExpenses[monthKey] = [];
    updatedExpenses[monthKey].unshift(newExpense);
    
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const toggleExpenseComplete = (id) => {
    const updatedExpenses = { ...expenses };
    const expenseIndex = updatedExpenses[monthKey]?.findIndex(e => e.id === id);
    
    if (expenseIndex !== -1) {
      updatedExpenses[monthKey][expenseIndex].completed = 
        !updatedExpenses[monthKey][expenseIndex].completed;
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
  };

  const deleteExpense = (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    const updatedExpenses = { ...expenses };
    updatedExpenses[monthKey] = updatedExpenses[monthKey]?.filter(e => e.id !== id) || [];
    
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const monthExpenses = expenses[monthKey] || [];
  const filteredExpenses = filter === 'all' ? monthExpenses : 
                         filter === 'pending' ? monthExpenses.filter(e => !e.completed) :
                         monthExpenses.filter(e => e.completed);

  const totalSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = monthlyBudget - totalSpent;

  return (
    <div className="container">
      <header>
        <h1><i className="fas fa-wallet"></i> Monthly Expense Tracker</h1>
        <MonthSelector 
          currentDate={currentDate} 
          updateMonth={updateMonth} 
        />
      </header>

      <div className="budget-section">
        <BudgetCard 
          monthlyBudget={monthlyBudget} 
          setBudget={setBudget} 
          totalSpent={totalSpent} 
          remaining={remaining} 
        />
      </div>

      <ExpenseForm addExpense={addExpense} />

      <ExpenseList 
        expenses={filteredExpenses} 
        filter={filter} 
        setFilter={setFilter} 
        toggleComplete={toggleExpenseComplete} 
        deleteExpense={deleteExpense} 
      />
      
      <footer className="footer">
        Developed By Sohel
      </footer>
    </div>
  );
}

export default App;