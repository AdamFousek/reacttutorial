import { useState } from 'react';

import ExpensesList from './ExpensesList.js';
import ExpenseFilter from "./ExpenseFilter.js";
import ExpensesChart from './ExpensesChart.js';
import Card from '../UI/Card';

import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');
  const setFilterYearHandler = (enteredYearData) => {
    setFilteredYear(enteredYearData);
  }
  const filteredExpenses = props.items.filter(expense => {
    return expense.date.getFullYear() === parseInt(filteredYear)
  });

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter year={filteredYear} onSetFilterYear={setFilterYearHandler} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;