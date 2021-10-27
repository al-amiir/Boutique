import React from "react";
import { Link } from "react-router-dom";
import SingleCart from "../components/SingleCart";

// As we are in Cart component,  we have two component, FullCart and EmptyCart

// We recive cart from App.js and it is looks like this :
////////////////////////////////////////////////////////////
// created: 1634927250
// currency: {code: "USD", symbol: "$"}
// discount: []
// expires: 1637523023
// hosted_checkout_url: "https://checkout.chec.io/cart/cart_J5aP3vV9pR7d2o"
// id: "cart_J5aP3vV9pR7d2o"
// line_items: [{…}]
// subtotal: {raw: 440, formatted: "440.00", formatted_with_symbol: "$440.00", formatted_with_code: "440.00 USD"}
// total_items: 22
// total_unique_items: 1
// updated: 1634931023
////////////////////////////////////////////////////////////

// 1)
// If line_items had objects, it is means that customer adds some products in cart, so we use FullCart component
// What we do in FullCart Component :
// - loop through every product in cart with SingleCart component and send data to it and methods
// - display some details about cart like total items and total price

// 2)
// If line_items had no objects display EmptyCart
const Cart = ({ cart, handleAddUpdateCart, handleAddRemoveFromCart, handleAddEmptyCart }) => {
  // 1)
  function FullCart() {
    return (
      <div className="fullCart">
        <div className="fullCart_products">
          {cart.line_items.map((c) => (
            <SingleCart key={c.id} data={c} handleAddUpdateCart={handleAddUpdateCart} handleAddRemoveFromCart={handleAddRemoveFromCart} />
          ))}
        </div>
        <div className="fullCart_total">
          <div className="fullCart_details">
            <span className="fullCart_details-totalItems">
              <strong>total items: </strong> {cart.total_items}
            </span>
            <span className="fullCart_details-totalPrice">
              <strong>total price :</strong> {cart.subtotal.formatted_with_symbol}
            </span>
          </div>
          <button className="button_empty" onClick={() => handleAddEmptyCart()}>
            Empty Cart
          </button>
          <Link to="/checkout">
            <button className="button_checkout">Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
  function EmptyCart() {
    return <div className="emptyCart">Your Cart is empty, Add some products dude!</div>;
  }
  if (!cart.line_items) return <>Loading...</>;
  return (
    <div className="cartContainer">
      <h1>Cart</h1>
      {!cart.line_items.length ? <EmptyCart /> : <FullCart />}
    </div>
  );
};

export default Cart;
