import React from "react";
import { BrowserRouter as Link, Switch } from "react-router-dom";

const Navbar = ({ cartTotalItem }) => {
  return (
    <div className="navbar">
      <span>logo</span>
      <Switch>
        <Link to="/">
          <span>Home</span>
        </Link>
      </Switch>
      <Link to={`/cart`}>
        <button>
          cart <span>{cartTotalItem}</span>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
