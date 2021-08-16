import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const postcodeValid = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postcode: true,
    city: true,
  })
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreedIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostcodeIsValid = postcodeValid(enteredPostcode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreedIsValid,
      postcode: enteredPostcodeIsValid,
      city: enteredCityIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreedIsValid &&
      enteredCityIsValid &&
      enteredPostcodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postcode: enteredPostcode,
      city: enteredCity
    })
  };

  const nameClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const postcodeClasses = `${classes.control} ${formInputsValidity.postcode ? '' : classes.invalid}`;
  const cityClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postcodeClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postcodeInputRef} type='text' id='postal' />
        {!formInputsValidity.postcode && <p>Please enter a valid post code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;