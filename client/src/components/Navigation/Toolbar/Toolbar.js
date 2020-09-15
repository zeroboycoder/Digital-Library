import React from "react";
import "./Toolbar.css";
import Logo from "../../../assets/logo.png";
import NavItem from "../NavItems/NavItem/NavItem";
import NavItems from "../NavItems/NavItems";
import ToogleBtn from "../../../assets/list.svg";

const Toolbar = (props) => {
  return (
    <header>
      <nav>
        {/* Logo */}
        <div className="Brand">
          <NavItem link="/">
            <img src={Logo} className="Logo" alt="Logo" />
          </NavItem>
        </div>
        <div>
          {/* Nav Items */}
          <NavItems className="Toolbar__NavItems" />
          {/* Toogle Button */}
          <div className="ToogleBtn">
            <img src={ToogleBtn} alt="Logo" onClick={props.clicked} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
