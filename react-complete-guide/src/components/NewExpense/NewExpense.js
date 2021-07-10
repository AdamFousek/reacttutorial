import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

import './NewExpense.css';

const NewExpense = (props) => {
  const saveExpenseHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
    setIsEditting(false);
  };

  const [isEditting, setIsEditting] = useState(false);
  const startEditingHandler = () => {
    setIsEditting(true);
  }
  const stopEditingHandler = () => {
    setIsEditting(false);
  }

  return (
    <div className="new-expense">
      {!isEditting && <button onClick={startEditingHandler}>Add New Expense</button>}
      {isEditting && <ExpenseForm onSaveExpense={saveExpenseHandler} onCancel={stopEditingHandler} />}
    </div>
  )
}

export default NewExpense;