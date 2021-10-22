import React from "react";
import Product from "./product/Product";

const products = [
  {
    id: "1",
    name: "t-shirt",
    price: "$10",
    description: "lap lap la",
    image: "https://via.placeholder.com/150/000000",
  },
  {
    id: "2",
    name: "pants",
    price: "$30",
    description: "lap lap la",
    image: "https://via.placeholder.com/150/000000",
  },
];

const Products = () => {
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
