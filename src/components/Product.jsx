import React from "react";

const Product = ({ product, handleAddToCart }) => {
  return (
    <div className="product">
      <div className="product_image">
        <img src={product.image.url} alt=" " />
      </div>
      <div className="product_text">
        <p>{product.name}</p>
        <p>${product.price.raw}</p>
        <p>{product.description}</p>
        {console.log(product)}
      </div>
      <button onClick={() => handleAddToCart(product.id, 1)}>
        <span></span>
        <span></span>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Product;
