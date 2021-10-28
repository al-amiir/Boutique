import React from "react";

const LastCartReview = ({ token }) => {
  return (
    <div className="last_cart_review">
      {token.live.line_items.map((product) => (
        <div className="last_cart_review_div" key={product.name}>
          <div className="last_cart_review_text">
            <span>{product.name}</span>
            <span>Quantity: {product.quantity}</span>
          </div>
          <span className="last_cart_review_cost">{product.line_total.formatted_with_symbol}</span>
        </div>
      ))}
      <div className="last_cart_review_totalCost">
        <span>Total: </span>
        <span> {token.live.subtotal.formatted_with_symbol}</span>
      </div>
    </div>
  );
};

export default LastCartReview;
