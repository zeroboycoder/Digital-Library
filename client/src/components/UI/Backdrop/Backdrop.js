import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
   return (
      <div
         className="Backdrop"
         style={props.showed ? { display: "block" } : { display: "none" }}
         onClick={props.clicked}
      ></div>
   );
};

export default Backdrop;
