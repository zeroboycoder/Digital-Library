import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import * as actions from "../../../store/action/rootActions";

class NavItems extends Component {
   state = {
      showSubMenu: {},
      showAuthDropDrown: {},
      textInput: "",
   };

   showDropDown = () => {
      this.setState({ showSubMenu: { display: "block" } });
   };

   cancelDropdown = () => {
      this.setState({ showSubMenu: { display: "none" } });
   };

   showAuthDropDownFun = () => {
      this.setState({ showAuthDropDrown: { display: "block" } });
   };
   cancleAuthDropDrownFun = () => {
      this.setState({ showAuthDropDrown: { display: "none" } });
   };

   logOutFun = () => {
      this.setState({ showAuthDropDrown: { display: "none" } });
      this.props.onLogOut(this.props);
   };

   inputChangeHander = (event) => {
      this.setState({ textInput: event.target.value });
   };

   onClickHandler = () => {
      const value = this.state.textInput.toLowerCase();
      const splitValue = value.split(" ");
      this.props.history.replace("/ebooks/searched?_q=" + splitValue.join("-"));
      this.setState({ textInput: "" });
   };

   render() {
      let uname;
      if (this.props.username) {
         uname = this.props.username.split(" ")[0];
      }
      let authNav = (
         <React.Fragment>
            <li
               className="Nav__Dropdown"
               onMouseOver={this.showAuthDropDownFun}
               onMouseLeave={this.cancleAuthDropDrownFun}
            >
               <NavItem link="#">{uname}</NavItem>
               <ul
                  className="Nav__SubMenu"
                  style={this.state.showAuthDropDrown}
               >
                  <li onClick={this.cancleAuthDropDrownFun}>
                     <NavItem link="/add-ebook">Add Ebook</NavItem>
                  </li>
                  <li onClick={this.cancleAuthDropDrownFun}>
                     <NavItem link="/setting">Setting</NavItem>
                  </li>
                  <li onClick={this.logOutFun}>
                     <NavItem link="#">Logout</NavItem>
                  </li>
               </ul>
            </li>
         </React.Fragment>
      );
      if (!this.props.username) {
         authNav = (
            <li>
               <NavItem link="/auth/signin">Sign In</NavItem>
            </li>
         );
      }

      return (
         <ul className="Nav">
            <li>
               <NavItem link="/" exact={true}>
                  Home
               </NavItem>
            </li>
            <li
               className="Nav__Dropdown"
               onMouseOver={this.showDropDown}
               onMouseLeave={this.cancelDropdown}
            >
               <NavItem link="#">Categories</NavItem>
               <ul className="Nav__SubMenu" style={this.state.showSubMenu}>
                  <li onClick={this.cancelDropdown}>
                     <NavItem link="/categories/civil">Civil</NavItem>
                  </li>
                  <li onClick={this.cancelDropdown}>
                     <NavItem link="/categories/electronic">Electronic</NavItem>
                  </li>
                  <li onClick={this.cancelDropdown}>
                     <NavItem link="/categories/electrical-power">
                        Electrical Power
                     </NavItem>
                  </li>
                  <li onClick={this.cancelDropdown}>
                     <NavItem link="/categories/mechnical">Mechnical</NavItem>
                  </li>
                  <li onClick={this.cancelDropdown}>
                     <NavItem link="/categories/information-technology">
                        Information Technology
                     </NavItem>
                  </li>
               </ul>
            </li>
            <li>
               <NavItem link="/contact">Contact Us</NavItem>
            </li>
            {authNav}
         </ul>
      );
   }
}

const stateToProps = (state) => {
   return {
      username: state.auth.username,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLogOut: (props) => dispatch(actions.onLogOut(props)),
   };
};

export default connect(stateToProps, dispatchToProps)(withRouter(NavItems));
