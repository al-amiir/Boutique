import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import { commerce } from "./library/commerce";
import Navbar from "./mainComponent/Navbar";
const App = () => {
  let [products, setProducts] = useState([]);

  let fetchApi = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    console.log(data);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
