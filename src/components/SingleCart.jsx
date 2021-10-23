import React from "react";

const SingleCart = ({ data, handleAddUpdateCart, handleAddRemoveFromCart }) => {
  return (
    <div className="singleCart">
      <div>{data.image.url}</div>
      <p>{data.name}</p>
      <p>price:{data.price.formatted_with_symbol}</p>
      <div>
        <button
          onClick={() =>
            handleAddUpdateCart(data.id, { quantity: data.quantity - 1 })
          }
        >
          -
        </button>
        <span>{data.quantity}</span>
        <button
          onClick={() =>
            handleAddUpdateCart(data.id, { quantity: data.quantity + 1 })
          }
        >
          +
        </button>
      </div>
      <div>
        <span>total price: {data.line_total.formatted_with_symbol}</span>
        <button onClick={() => handleAddRemoveFromCart(data.id)}>Remove</button>
      </div>
    </div>
  );
};

export default SingleCart;
// id: "item_7RyWOwmK5nEa2V"
// image: {id: "ast_A12JwrB3avwPjn", url: "https://cdn.chec.io/merchants/35082/assets/kVnRGLBXYdn9xcyw|IMG_20170926_204542_259.jpg", description: null, is_image: true, filename: "IMG_20170926_204542_259.jpg", …}
// is_valid: true
// line_total: {raw: 460, formatted: "460.00", formatted_with_symbol: "$460.00", formatted_with_code: "460.00 USD"}
// name: "T-Shirt"
// permalink: "Mfo8Me"
// price: {raw: 20, formatted: "20.00", formatted_with_symbol: "$20.00", formatted_with_code: "20.00 USD"}
// product_id: "prod_VPvL5z3N1rlAQk"
// product_meta: []
// product_name: "T-Shirt"
// quantity: 23
