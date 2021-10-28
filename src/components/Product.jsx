import React from "react";

const Product = ({ product, handleAddToCart }) => {
  return (
    <div className="product">
      <img className="product_image" src={product.image.url} alt=" " />
      <div className="product_text">
        <p>{product.name}</p>
        <p>${product.price.raw}</p>
        <p>{product.description}</p>
        {console.log(product)}
      </div>
      <button onClick={() => handleAddToCart(product.id, 1)}>
        <i className="fas fa-plus"></i>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
