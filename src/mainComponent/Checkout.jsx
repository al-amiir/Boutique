import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";

const Checkout = () => {
  const [steps, setSteps] = useState(["AddressForm", "PaymentForm"]);
  const [checker, setChecker] = useState(0);
  return (
    <div className="checkout">
      <div className="checkout_circles">
        {steps.map((label, i) => (
          <div>
            {i <= checker && <span className="checkout_circles-icons"></span>}
            <span>{label}</span>
          </div>
        ))}
      </div>
      {/* <div>{checker === 0 ? <AddressForm /> : <PaymentForm />}</div> */}
      {checker === steps.length ? (
        "Nice"
      ) : checker === 0 ? (
        <AddressForm />
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
