import React from "react";
import { Link } from "react-router-dom";
import SingleCart from "../components/SingleCart";
import Loading from "../components/Loading";
import ManShoppig from "../style/material/man-shopping.png";
import WomanShoppig from "../style/material/woman-shopping.png";

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
////////////////////////////////////////////////////////////
// 2)
// If line_items had no objects display EmptyCart
////////////////////////////////////////////////////////////

const Cart = ({ cart, handleAddUpdateCart, handleAddRemoveFromCart, handleAddEmptyCart, refreshCart }) => {
  // 1)
  function FullCart() {
    return (
      <div>
        {/* <img src={businessReport} alt="" /> */}
        <div className="fullCart">
          <div className="fullCart_products">
            {cart.line_items.map((c) => (
              <SingleCart key={c.id} data={c} handleAddUpdateCart={handleAddUpdateCart} handleAddRemoveFromCart={handleAddRemoveFromCart} refreshCart={refreshCart} />
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
      </div>
    );
  }
  function EmptyCart() {
    return (
      <div className="emptyCart">
        <p className="emptyCart_text sign">
          Your Cart is <span className="flicker">e</span>mp <span className="flicker">t</span> y, Add some <span className="fast-flicker">products </span>
        </p>
        <div className="emptyCart_image">
          <img className="emptyCart_image-woman" src={WomanShoppig} alt="" />
          <img className="emptyCart_image-man" src={ManShoppig} alt="" />
        </div>
      </div>
    );
  }
  if (!cart.line_items) return <Loading />;
  return <div className="cartContainer">{!cart.line_items.length ? <EmptyCart /> : <FullCart />}</div>;
};

export default Cart;
