import React from "react";
import "./Modal.css";

const Modal = (props) => {
   return (
      <div
         style={
            props.showed
               ? { transform: "translateY(0)" }
               : { transform: "translateY(-100vh)" }
         }
         className="Modal"
      >
         {props.children}
      </div>
   );
};

export default Modal;
