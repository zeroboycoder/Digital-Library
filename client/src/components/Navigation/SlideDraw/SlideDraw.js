import React, { useState } from "react";
import { connect } from "react-redux";
import "./SlideDraw.css";
import NavItem from "../NavItems/NavItem/NavItem";
import Logo from "../../../assets/logo.png";
import Backdrop from "../../UI/Backdrop/Backdrop";

let haveDisplay = false;
const SlideDraw = (props) => {
   const [showSubMenu, setShowSubMenu] = useState();
   const showSubMenuFun = () => {
      if (haveDisplay) {
         haveDisplay = false;
         setShowSubMenu({ display: "none" });
      } else {
         haveDisplay = true;
         setShowSubMenu({ display: "block" });
      }
   };

   return (
      <div>
         <Backdrop showed={props.showed} clicked={props.clicked} />
         <div
            className="SlideDraw"
            style={
               props.showed
                  ? { transform: "translateX(0)" }
                  : { transform: "translateX(-100%)" }
            }
         >
            <div className="SlideDraw__Brand">
               <img src={Logo} alt="Logo" />
            </div>

            {props.username ? (
               <p className="SlideDraw__UserName">{props.username}</p>
            ) : null}

            <ul className="SlideDraw__Nav">
               <li onClick={props.clicked}>
                  <NavItem link="/" exact={true}>
                     Home
                  </NavItem>
               </li>
               <li className="SlideDraw__Nav__WithUl">
                  <span onClick={showSubMenuFun}>Categories</span>
                  <ul
                     className="SlideDraw__Nav__Submenu"
                     style={showSubMenu}
                     onClick={props.clicked}
                  >
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/web-development">
                           Web Development
                        </NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/web-design">
                           Web Design
                        </NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/database">Database</NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/programming">
                           Programming
                        </NavItem>
                     </li>
                  </ul>
               </li>
               <li onClick={props.clicked}>
                  <NavItem link="/contact">Contact Us</NavItem>
               </li>
               {props.username ? (
                  <React.Fragment>
                     <li onClick={props.clicked}>
                        <NavItem link="/add-ebook">Add Ebook</NavItem>
                     </li>
                     <li onClick={props.clicked} className="Danger__Link">
                        <NavItem link="/api/auth/logout">Logout</NavItem>
                     </li>
                  </React.Fragment>
               ) : (
                  <li onClick={props.clicked} className="Success__Link">
                     <NavItem link="/auth/signup">Register</NavItem>
                  </li>
               )}
            </ul>
         </div>
      </div>
   );
};

const stateToProps = (state) => {
   return {
      username: state.auth.username,
   };
};

export default connect(stateToProps)(SlideDraw);
