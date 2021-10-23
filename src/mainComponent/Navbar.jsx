import React from "react";
import {
  BrowserRouter as useLocation,
  Link,
  Switch,
  useRouteMatch,
} from "react-router-dom";

const Navbar = ({ cartTotalItem }) => {
  let { path, url } = useRouteMatch();

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
