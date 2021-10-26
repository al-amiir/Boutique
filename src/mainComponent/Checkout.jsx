import React, { useState, useEffect } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { commerce } from "../library/commerce";

// Lets Read What is Checkout in commerce.js :
//
// The checkout resource is used to navigate your customers
// through the transaction and shipping stage of a purchasing flow.
// A checkout captures data sent from the cart along with the item information,
// line item IDs, any shipping or billing information as well as tax and shipping rates.
//---------------------------------------------------------------------------------------
// 1)
// Lets Generate Token by cart.id
// We need shipping data
// So we create Address Component to make client set his info in it then we get it in shippingData variable
// Go to Address Component
//---------------------------------------------------------------------------------------
// 2)
// Back from Address Component
// Now we have shippingData
// Send it to PaymentForm With handleCaptureCheckout
// Go to Payment Component
//---------------------------------------------------------------------------------------

const Checkout = ({ cart, handleCaptureCheckout }) => {
  const [steps, setSteps] = useState(["AddressForm", "PaymentForm"]);
  const [checker, setChecker] = useState(0);
  const [token, setToken] = useState([]);
  const [shippingData, setShippingData] = useState([]);

  /////////////////////////////////////////////////////////////////////////
  // 1)
  useEffect(async () => {
    try {
      let tokens = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setToken(tokens);
    } catch (error) {
      console.log(error);
    }
  }, [cart, shippingData]);

  function submitData(data) {
    setShippingData(data);
    nextStep();
  }
  /////////////////////////////////////////////////////////////////////////

  function nextStep() {
    setChecker(checker + 1);
  }
  function backStep() {
    setChecker(checker - 1);
  }

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
      {checker === steps.length ? "Nice" : checker === 0 ? <AddressForm token={token} submitData={submitData} /> : <PaymentForm shippingData={shippingData} token={token} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} />}
      <button disabled={checker === 0 ? true : false} onClick={backStep}>
        back
      </button>
      <button disabled={checker === 2 ? true : false} onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default Checkout;
