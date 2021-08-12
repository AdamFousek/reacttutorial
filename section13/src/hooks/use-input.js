import { useState, useReducer } from "react";

const initializeInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            value: action.value,
            isTouched: state.isTouched,
        };
    } else if (action.type === 'BLUR') {
        return {
            value: state.value,
            isTouched: true,
        };
    } else if (action.type === 'RESET') {
        return initializeInputState;
    }
    return initializeInputState;
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initializeInputState);
    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    // const valueIsValid = validateValue(enteredValue);
    // const hasError = !valueIsValid && isTouched;

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
        // setEnteredValue((old) => { return event.target.value });
    }

    const inputBlurHandler = (event) => {
        dispatch({ type: 'BLUR' });
        // setIsTouched(true);
    }

    const resetInput = () => {
        dispatch({ type: 'RESET' });
        // setEnteredValue('');
        // setIsTouched(false);
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetInput
    };
};

export default useInput;