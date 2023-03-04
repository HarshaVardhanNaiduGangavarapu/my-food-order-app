import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const carCtx = useContext(CartContext);

  const cartItemNum = carCtx.items.reduce((totalItems, item) => {
    return totalItems + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>My cart</span>
      <span className={classes.badge}>{cartItemNum}</span>
    </button>
  );
};

export default HeaderCartButton;
