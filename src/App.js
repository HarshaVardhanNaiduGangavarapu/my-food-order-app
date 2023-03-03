import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, setCartShow] = useState(false);
  const showCartHandler = () => setCartShow(true);
  const hideCartHandler = () => setCartShow(false);

  return (
    <CartProvider>
      {cartShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
