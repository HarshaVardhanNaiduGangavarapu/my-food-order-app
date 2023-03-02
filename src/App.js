import { Fragment, useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals/Meals";

function App() {
  const [cartShown, setCartShow] = useState(false);

  const showCartHandler = () => setCartShow(true);
  const hideCartHandler = () => setCartShow(false);

  return (
    <Fragment>
      {cartShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
