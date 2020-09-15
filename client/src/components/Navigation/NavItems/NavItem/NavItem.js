import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

const NavItem = (props) => {
   return (
      <NavLink className="NavItem" to={props.link} {...props}>
         {props.children}
      </NavLink>
   );
};

export default NavItem;
