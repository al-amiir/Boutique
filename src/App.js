import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import { commerce } from "./library/commerce";
import Navbar from "./mainComponent/Navbar";
const App = () => {
  let [product, setProduct] = useState([]);

  let fetchApi = async () => {
    const { data } = await commerce.products.list();
    setProduct(data);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
