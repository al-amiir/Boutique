import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React from "react";
import LastCartReview from "./LastCartReview";

// Here we use stripe to complete payment of cart
// 1)
// load stripe
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

// 2)
// Use Element component, pass stripe to it

// 3)
// Use Elemnt Counsumer Component

// 4)
// pass elements,stripe to onSubmit

// 5)
// Create handleSubmit method to deal with recieved elements and stripe

const PaymentForm = ({ shippingData, token, nextStep, backStep, handleCaptureCheckout, setErrorMessage, time }) => {
  ////////////////////////////////////////////////////////////////////////////////
  // 5)
  const handleSubmit = async (event, elements, stripe) => {
    // 5.1)
    // Prevent Default
    event.preventDefault();
    // 5.2)
    // if no stripe or elements go out
    if (!stripe || !elements) return;
    // 5.3)
    // Destructure error and paymentMethod
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    // 5.4)
    // if there is any errors
    if (error) {
      console.log("[error]", error);
      // setErrorMessage(error);
    } else {
      // 5.5)
      // Create the last and final object about your order

      const orderData = {
        line_items: token.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      // 5.6)
      // Capture order to capture an order and payment by providing the checkout token
      // and necessary data for the order to be completed.
      // The resolved promise returns an order object which can be used for receipt.
      handleCaptureCheckout(token.id, orderData);
      time();
      nextStep();
    }
  };
  return (
    <div>
      <LastCartReview token={token} />
      <hr />

      {/* 2 */}
      <Elements stripe={stripePromise}>
        {/* 3 */}
        <ElementsConsumer>
          {/* 4 */}
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={backStep}>Back</button>
                <button type="submit" disabled={!stripe}>
                  Pay {token.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
