import classes from "./MealItemForm.module.css";
import Input from "../../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountValid(false);
      return;
    }
    props.onAddAmountToCart(enteredAmountNum);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValid && <p>Invalid amount. use between (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
