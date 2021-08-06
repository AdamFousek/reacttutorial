import { useRef, useState } from 'react';

import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submiteHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return
        }

        props.onAddToCart(enteredAmountNumber);
    };
    const input = {
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    }
    return <form className={classes.form} onSubmit={submiteHandler}>
        <Input label={"Amount"} input={input} ref={amountInputRef} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>;
}

export default MealItemForm;