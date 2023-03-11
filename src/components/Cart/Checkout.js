import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputInValidity, setInputFormInValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isValid = (value) => value.trim().length > 0;
  const isValidPostalCode = (value) => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setInputFormInValidity({
      name: isValid(enteredName),
      street: isValid(enteredStreet),
      postalCode: isValidPostalCode(enteredPostalCode),
      city: isValid(enteredCity),
    });

    const formInvalid =
      isValid(enteredName) ||
      isValid(enteredStreet) ||
      isValidPostalCode(enteredPostalCode) ||
      isValid(enteredCity);
    if (!formInvalid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClass = `${classes.control} ${
    formInputInValidity.name ? "" : classes.invalid
  }`;

  const streetControlClass = `${classes.control} ${
    formInputInValidity.street ? "" : classes.invalid
  }`;

  const postalCodeControlClass = `${classes.control} ${
    formInputInValidity.postalCode ? "" : classes.invalid
  }`;

  const cityControlClass = `${classes.control} ${
    formInputInValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputInValidity.name && <p>Enter Name</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputInValidity.street && <p>Enter Street</p>}
      </div>
      <div className={postalCodeControlClass}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" ref={postalCodeInputRef} />
        {!formInputInValidity.postalCode && <p>Enter Postal Code</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputInValidity.city && <p>Enter City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
