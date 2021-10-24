import React, { useEffect, useState } from "react";
import Products from "./mainComponent/Products";
import { commerce } from "./library/commerce";
import Navbar from "./mainComponent/Navbar";
import Cart from "./mainComponent/Cart";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Checkout from "./mainComponent/Checkout";

const App = () => {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});
  let fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  let fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  };
  let handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  let handleAddUpdateCart = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, quantity);
    setCart(item.cart);
  };
  let handleAddRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item.cart);
  };
  let handleAddEmptyCart = async (productId) => {
    const item = await commerce.cart.empty(productId);
    setCart(item.cart);
  };
  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);
  return (
    <div>
      <Switch>
        <Navbar cartTotalItem={cart.total_items} />
        <Route exact path="/">
          <Products products={products} handleAddToCart={handleAddToCart} />
        </Route>
        <Route path="/cart">
          <Cart
            cart={cart}
            handleAddUpdateCart={handleAddUpdateCart}
            handleAddRemoveFromCart={handleAddRemoveFromCart}
            handleAddEmptyCart={handleAddEmptyCart}
          />
        </Route>
        <Route path="/Checkout">
          <Checkout cart={cart} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
