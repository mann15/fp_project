import React from "react";
import { NavLink } from "react-router-dom";

const Subheader = () => {
  return (
    <div className="subheader-container">
      <ul>
        <li>
          <NavLink exact to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/men">
            Men
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/kids">
            Kids
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/women">
            Women
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/result">
            Category 4
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Subheader;
