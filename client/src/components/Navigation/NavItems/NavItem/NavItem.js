import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

const NavItem = (props) => {
   let navLink = (
      <NavLink className="NavItem" to={props.link}>
         {props.children}
      </NavLink>
   );
   if (props.hash) {
      navLink = (
         <a className="NavItem" href={props.hash}>
            {props.children}
         </a>
      );
   }
   return navLink;
};

export default NavItem;
