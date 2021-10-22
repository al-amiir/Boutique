import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img className="product_image" src={product.image.url} alt=" " />
      <p>{product.name}</p>
      <p>{product.price.raw}</p>
      <p>{product.description}</p>
      <button>add to cart </button>
    </div>
  );
};

export default Product;
