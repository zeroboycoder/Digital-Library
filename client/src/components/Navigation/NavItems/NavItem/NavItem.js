import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

const NavItem = (props) => {
   let navLink;
   if (props.hash) {
      navLink = (
         <a className="NavItem" href={props.hash}>
            {props.children}
         </a>
      );
   } else {
      navLink = (
         <NavLink className="NavItem" to={props.link}>
            {props.children}
         </NavLink>
      );
   }
   return navLink;
};

export default NavItem;
