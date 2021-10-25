import React, { useState, useEffect } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { commerce } from "../library/commerce";

const Checkout = ({ cart, handleCaptureCheckout }) => {
  const [steps, setSteps] = useState(["AddressForm", "PaymentForm"]);
  const [checker, setChecker] = useState(0);
  const [token, setToken] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  // Recived Cart from Cart component
  // Generate Token by cart id
  // send token to Address form

  function nextStep() {
    setChecker(checker + 1);
  }
  function backStep() {
    setChecker(checker - 1);
  }

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
  }, [cart, shippingData]);

  function submitData(data) {
    setShippingData(data);
    nextStep();
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
      {checker === steps.length ? (
        "Nice"
      ) : checker === 0 ? (
        <AddressForm token={token} submitData={submitData} />
      ) : (
        <PaymentForm
          shippingData={shippingData}
          token={token}
          nextStep={nextStep}
          backStep={backStep}
          handleCaptureCheckout={handleCaptureCheckout}
        />
      )}
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
