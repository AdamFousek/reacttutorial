import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: nameInputValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: nameResetInput
  } = useInput(value => value.trim() !== '');

  const {
    value: lastnameInputValue,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangedHandler,
    inputBlurHandler: lastnameBlurHandler,
    resetInput: lastnameResetInput
  } = useInput(value => value.trim() !== '');

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: emailResetInput
  } = useInput(value => value.includes('@'));

  let isFormValid = false;
  if (nameIsValid && lastnameIsValid && emailIsValid) {
    isFormValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid || !lastnameIsValid || !emailIsValid) {
      return;
    }

    nameResetInput();
    lastnameResetInput();
    emailResetInput();
  }

  const nameInputClasses = nameHasError ? 'form-control invalid' : 'form-control';
  const lastnameInputClasses = lastnameHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='control-group'>
        <div className={nameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={nameInputValue}
            onBlur={nameBlurHandler}
            onChange={nameChangedHandler}
          />
          {nameHasError && <p className="error-text">This field must not be empty!</p>}
        </div>
        <div className={lastnameInputClasses}>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            value={lastnameInputValue}
            onBlur={lastnameBlurHandler}
            onChange={lastnameChangedHandler}
          />
          {lastnameHasError && <p className="error-text">This field must not be empty!</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={emailInputValue}
          onBlur={emailBlurHandler}
          onChange={emailChangedHandler}
        />
        {emailHasError && <p className="error-text">Enter a valid email!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
