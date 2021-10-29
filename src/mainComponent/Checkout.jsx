import React, { useState, useEffect } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import { commerce } from "../library/commerce";
import Confirmation from "../components/Confirmation";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
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
// Back from Address Component ?
// Now we have shippingData
// Send it to PaymentForm With handleCaptureCheckout
// Go to Payment Component
//---------------------------------------------------------------------------------------
// 3)
// Back from Payment Component ?
// Now you in the last step , The Confirmation
// Go to Confirmation Component
//---------------------------------------------------------------------------------------

const Checkout = ({ cart, handleCaptureCheckout, order, errorMessage, setErrorMessage }) => {
  const [steps, setSteps] = useState(["AddressForm", "PaymentForm", "Confirmation"]);
  const [checker, setChecker] = useState(0);
  const [token, setToken] = useState([]);
  const [shippingData, setShippingData] = useState([]);

  const [finished, setFinished] = useState(false);

  function time() {
    setTimeout(() => {
      setFinished(true);
      return <p>Thanks</p>;
    }, 3000);
  }
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
      {/* <div className="checkout_circles"> */}
      <Stepper className="checkout_stepper" activeStep={checker} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="h6"> {label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <span className="checkout_borders"></span>
      {checker === steps.length ? <Confirmation finished={finished} order={order} errorMessage={errorMessage} /> : checker === 0 ? <AddressForm token={token} submitData={submitData} /> : <PaymentForm shippingData={shippingData} token={token} nextStep={nextStep} backStep={backStep} setErrorMessage={setErrorMessage} handleCaptureCheckout={handleCaptureCheckout} time={time} />}
    </div>
  );
};

export default Checkout;
