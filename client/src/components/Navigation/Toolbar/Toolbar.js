import React from "react";
import "./Toolbar.css";
import Logo from "../../../assets/logo.png";
import NavItems from "../NavItems/NavItems";
import ToogleBtn from "../../../assets/list.svg";

const Toolbar = (props) => {
   return (
      <header>
         <nav>
            {/* Logo */}
            <div className="Brand">
               <img
                  src={Logo}
                  className="Logo"
                  alt="Logo"
                  onClick={() => props.history.push("/")}
               />
            </div>
            <div>
               {/* Nav Items */}
               <NavItems className="Toolbar__NavItems" />
               {/* Toogle Button */}
               <div className="ToogleBtn">
                  <i className="fas fa-bars" onClick={props.clicked}></i>
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Toolbar;
