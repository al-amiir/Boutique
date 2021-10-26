import React from "react";

const SingleCart = ({ data, handleAddUpdateCart, handleAddRemoveFromCart }) => {
  return (
    <div className="singleCart">
      <img className="singleCart_image" src={data.image.url} alt="" />
      <div className="singleCart_text">
        <p>
          <span>name:</span> {data.name}
        </p>
        <p>
          <span>price:</span>
          {data.price.formatted_with_symbol}
        </p>
        <div className="singleCart_quantity">
          <button onClick={() => handleAddUpdateCart(data.id, { quantity: data.quantity - 1 })} className="singleCart_button singleCart_button-minus">
            -
          </button>
          <span>{data.quantity}</span>
          <button onClick={() => handleAddUpdateCart(data.id, { quantity: data.quantity + 1 })} className="singleCart_button singleCart_button-plus">
            +
          </button>
        </div>
        <p>
          <span>total price:</span> {data.line_total.formatted_with_symbol}
        </p>
        <button onClick={() => handleAddRemoveFromCart(data.id)} className="singleCart_button-remove">
          Remove
        </button>
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
