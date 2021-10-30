import React from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import fullCart from "../style/material/fullCart.png";
// Here if we had error, back to home
// else, if we get order.customer, meaning that order is loaded display Done
// else display Loading untill it loads

let Confirmation = ({ errorMessage, order, finished, refreshCart }) => {
  function EndShipping() {
    return (
      <div className="endShipping">
        <img className="endShipping_image" src={fullCart} alt="" />
        <p>Thank you for your purchases.</p>
        {/* <p>Order ref: {order.customer_reference}</p> */}
        <Link to="/">
          <button className="endShipping_home" onClick={refreshCart}>
            Home
          </button>
        </Link>
      </div>
    );
  }
  return <div className="confirmation">{order.customer ? "Done" : finished ? <EndShipping /> : <Loading />}</div>;
};

export default Confirmation;
