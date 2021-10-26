import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartTotalItem }) => {
  return (
    <div className="navbar">
      <span>logo</span>
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to="/cart">
        <button className="navbar_cart">
          <span class="material-icons">add_shopping_cart</span>
          <p>{cartTotalItem}</p>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
