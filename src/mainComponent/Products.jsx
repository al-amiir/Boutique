import React from "react";
import Loading from "../components/Loading";
import Product from "../components/Product";
// Here we Recived products array and handleAddToCart method
// Then looping array through Product Component

const Products = ({ products, handleAddToCart }) => {
  if (!products.length) return <Loading />;
  return (
    <div className="products">
      <h1 class="ml5">
        <span class="text-wrapper">
          <span class="line line1"></span>
          <span class="letters letters-left">added</span>
          <span class="letters ampersand">to</span>
          <span class="letters letters-right">cart</span>
          <span class="line line2"></span>
        </span>
      </h1>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} handleAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default Products;
