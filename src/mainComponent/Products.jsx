import React from "react";
import Product from "../components/Product";

// Here we Recived products array and handleAddToCart method
// Then looping array through Product Component

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
