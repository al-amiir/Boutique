import React from "react";
import Product from "./product/Product";

const Products = ({ products, handleAddToCart }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} handleAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default Products;
