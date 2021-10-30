import React from "react";
import { addToCartAnimation } from "../globalFunction/global";
const Product = ({ product, handleAddToCart }) => {
  return (
    <div className="product">
      <div className="product_image">
        <img src={product.image.url} alt=" " />
      </div>
      <div className="product_text">
        <p>{product.name}</p>
        <p>${product.price.raw}</p>
      </div>
      <button
        onClick={() => {
          addToCartAnimation();
          handleAddToCart(product.id, 1);
        }}
      >
        <span></span>
        <span></span>+{/* <i className="fas fa-plus"></i> */}
      </button>
    </div>
  );
};

export default Product;
