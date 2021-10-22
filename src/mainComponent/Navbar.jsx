import React from "react";

const Navbar = ({ cartTotalItem }) => {
  return (
    <div className="navbar">
      <span>logo</span>
      <button>
        cart <span>{cartTotalItem}</span>{" "}
      </button>
    </div>
  );
};

export default Navbar;
