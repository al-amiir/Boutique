import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import { commerce } from "./library/commerce";
import Navbar from "./mainComponent/Navbar";
import Cart from "./mainComponent/Cart";
const App = () => {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});

  let fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  let fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  };
  let handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
    console.log(cart);
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar cartTotalItem={cart.total_items} />
      <Products products={products} handleAddToCart={handleAddToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
