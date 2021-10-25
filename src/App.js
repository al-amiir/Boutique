import React, { useEffect, useState } from "react";
import Products from "./mainComponent/Products";
import { commerce } from "./library/commerce";
import Navbar from "./mainComponent/Navbar";
import Cart from "./mainComponent/Cart";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Checkout from "./mainComponent/Checkout";

// Hello here is we start describe every detail
// First of all i used commerce.js to create my products (search for commerce.js)
// Then i add a library folder > commerce.js  (go to the file to read comments)
//---------------------------------------------------------------------------
// From commerce.js docs we have alot of methods
// Like >> commerce.products.list() << it used to get products
// So we fetch all products in the start of react render App.js through useEffect
// Then store them in products
// Then send Them to Products Component
// commerce.js also provide Cart fo us
// So we send to product component >> handleAddToCart << method to add a product to cart
//------------------------------------------------------------------------------
//
const App = () => {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  ///////////////////////////////////////////////////////////////////////
  let fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  let handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  ///////////////////////////////////////////////////////////////////////

  let fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
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
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
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
          <Checkout cart={cart} handleCaptureCheckout={handleCaptureCheckout} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
