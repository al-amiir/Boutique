import React from "react";

const LastCartReview = ({ token }) => {
  return (
    <div>
      {token.live.line_items.map((product) => (
        <div style={{ display: "flex" }} key={product.name}>
          <span>{product.name}</span>
          <span>Quantity: {product.quantity}</span>
          <span>{product.line_total.formatted_with_symbol}</span>
        </div>
      ))}
      <div>
        <span> {token.live.subtotal.formatted_with_symbol}</span>
      </div>
    </div>
  );
};

export default LastCartReview;
