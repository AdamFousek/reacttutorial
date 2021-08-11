import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouch, setEnteredNameTouch] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouch, setEneteredEmailTouch] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouch;

  const eneteredEmailIsValid = enteredEmail.trim() !== '' && enteredEmail.includes('@');
  const emailInputIsInvalid = !eneteredEmailIsValid && enteredEmailTouch;

  let formIsValid = false;
  if (enteredNameIsValid && eneteredEmailIsValid) {
    formIsValid = true;
  }


  const nameInputBlurHandler = (event) => {
    setEnteredNameTouch(true);
  }

  const emailInputBlurHandler = (event) => {
    setEneteredEmailTouch(true);
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName((old) => { return event.target.value });
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail((old) => { return event.target.value });
  }

  const formSubmitionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouch(true);
    setEneteredEmailTouch(true);

    if (!enteredNameIsValid || !eneteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName('');
    setEnteredNameTouch(false);
    setEnteredEmail('');
    setEneteredEmailTouch(false);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onBlur={nameInputBlurHandler}
          onChange={nameInputChangeHandler} />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Email address</label>
        <input
          type='email'
          id='name'
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler} />
        {emailInputIsInvalid && <p className="error-text">This is not valid email address</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
