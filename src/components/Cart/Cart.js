import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [orderClick, setOrderClick] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderCLickHandler = (event) => {
    setOrderClick(true);
  };

  const onOrderSubmitHandler = async (userData) => {
    setSubmittingOrder(true);
    await fetch(
      "https://my-food-order-app-64b79-default-rtdb.firebaseio.com/my-food-order-app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setSubmittingOrder(false);
    setSubmittedOrder(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderCLickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submittingOrderContent = <p>Submitting your order...</p>;

  const submittedOrderContent = (
    <Fragment>
      <p>Your order is processed sucessfully...!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderClick && (
        <Checkout
          onSubmit={onOrderSubmitHandler}
          onCloseCart={props.onCloseCart}
        />
      )}
      {!orderClick && modalActions}
    </Fragment>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {!submittedOrder && !submittingOrder && cartModalContent}
      {submittingOrder && submittingOrderContent}
      {!submittingOrder && submittedOrder && submittedOrderContent}
    </Modal>
  );
};

export default Cart;
