import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./SlideDraw.css";
import NavItem from "../NavItems/NavItem/NavItem";
import Logo from "../../../assets/logo.png";
import Backdrop from "../../UI/Backdrop/Backdrop";
import * as actions from "../../../store/action/rootActions";

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

   const LogoutFun = () => {
      props.clicked();
      props.onLogout(props);
   };

   return (
      <div>
         <Backdrop showed={props.showed} clicked={props.clicked} />
         <div
            className="SlideDraw"
            style={
               props.showed
                  ? { transform: "translateX(0)" }
                  : { transform: "translateX(100%)" }
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
                        <NavItem link="/categories/civil">Civil</NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/electronic">
                           Electronic
                        </NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/electrical-power">
                           Electrical Power
                        </NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/mechnical">
                           Mechnical
                        </NavItem>
                     </li>
                     <li onClick={showSubMenuFun}>
                        <NavItem link="/categories/information-technology">
                           Information Technology
                        </NavItem>
                     </li>
                  </ul>
               </li>
               <li onClick={props.clicked}>
                  <NavItem hash="#contact">Contact Us</NavItem>
               </li>
               {props.username ? (
                  <React.Fragment>
                     <li onClick={props.clicked}>
                        <NavItem link="/add-ebook">Add Ebook</NavItem>
                     </li>
                     <li onClick={props.clicked}>
                        <NavItem link="/setting">Setting</NavItem>
                     </li>
                     <li onClick={LogoutFun}>
                        <NavItem link="#">
                           <span className="text-danger">Logout</span>
                        </NavItem>
                     </li>
                  </React.Fragment>
               ) : (
                  <li onClick={props.clicked} className="Success__Link">
                     <NavItem link="/auth/signin">Sign in</NavItem>
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

const dispatchToProps = (dispatch) => {
   return {
      onLogout: (props) => dispatch(actions.onLogOut(props)),
   };
};

export default connect(stateToProps, dispatchToProps)(withRouter(SlideDraw));
