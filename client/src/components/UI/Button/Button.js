import React from "react";
import "./Button.css";

const Button = (props) => {
   return (
      <button
         className="Button"
         style={{ padding: props.padding }}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
};

export default Button;
