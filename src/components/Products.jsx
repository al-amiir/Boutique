import React from "react";
import Product from "./product/Product";

const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
