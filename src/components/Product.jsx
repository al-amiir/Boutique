import React from "react";

const Product = ({ product, handleAddToCart }) => {
  return (
    <div className="product">
      <img className="product_image" src={product.image.url} alt=" " />
      <p>{product.name}</p>
      <p>{product.price.raw}</p>
      <p>{product.description}</p>
      <button onClick={() => handleAddToCart(product.id, 1)}>Cart</button>
    </div>
  );
};

export default Product;
