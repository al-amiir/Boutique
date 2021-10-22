import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt=" " />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button>add to cart </button>
    </div>
  );
};

export default Product;
