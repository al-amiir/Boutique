import React, { useState, useEffect } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { commerce } from "../library/commerce";

const Checkout = ({ cart }) => {
  const [steps, setSteps] = useState(["AddressForm", "PaymentForm"]);
  const [checker, setChecker] = useState(0);
  const [token, setToken] = useState([]);
  // Recived Cart from Cart component
  // Generate Token by cart id
  // send token to Address form

  useEffect(async () => {
    try {
      // Generate Token
      let tokens = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      await setToken(tokens);
    } catch (error) {
      //   console.log(error);
    }
  }, [cart]);

  return (
    <div className="checkout">
      <div className="checkout_circles">
        {steps.map((label, i) => (
          <div key={i}>
            {i <= checker && <span className="checkout_circles-icons"></span>}
            <span>{label}</span>
          </div>
        ))}
      </div>
      {checker === steps.length ? (
        "Nice"
      ) : checker === 0 ? (
        <AddressForm token={token} />
      ) : (
        <PaymentForm />
      )}
      <button
        disabled={checker === 2 ? true : false}
        onClick={() => setChecker(checker + 1)}
      >
        move step
      </button>
    </div>
  );
};

export default Checkout;
