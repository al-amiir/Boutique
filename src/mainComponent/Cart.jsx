import React from "react";
import { Link } from "react-router-dom";
import SingleCart from "../components/SingleCart";
const Cart = ({
  cart,
  handleAddUpdateCart,
  handleAddRemoveFromCart,
  handleAddEmptyCart,
}) => {
  function FullCart() {
    return (
      <div className="fullCart">
        Full Cart
        <div>
          {cart.line_items.map((c) => (
            <SingleCart
              key={c.id}
              data={c}
              handleAddUpdateCart={handleAddUpdateCart}
              handleAddRemoveFromCart={handleAddRemoveFromCart}
            />
          ))}
        </div>
        <div className="cart_details">
          <span className="cart_details-totalItems">
            total items: {cart.total_items}
          </span>
          <span className="cart_details-totalPrice">
            total price : {cart.subtotal.formatted_with_symbol}
          </span>
        </div>
        <button onClick={() => handleAddEmptyCart()}>Empty</button>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
  function EmptyCart() {
    return (
      <div className="emptyCart">
        Your Cart is empty, Add some products dude!
      </div>
    );
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
