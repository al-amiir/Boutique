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
        <button>
          cart <span>{cartTotalItem}</span>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
