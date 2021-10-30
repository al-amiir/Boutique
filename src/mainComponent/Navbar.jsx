import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartTotalItem }) => {
  return (
    <div className="navbar">
      <span className="logo">Botique</span>
      <Link to="/Boutique/">
        <span>Home</span>
      </Link>
      <Link to="/Boutique/cart/">
        <button className="navbar_cart">
          <span className="material-icons">add_shopping_cart</span>
          <p>{cartTotalItem}</p>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
