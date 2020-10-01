import React from "react";
import "./Flash.css";

const Flash = (props) => {
   const classes = ["Flash"];
   classes.push(props.type);
   const flashMessage = props.message ? (
      <div className={classes.join(" ")}>
         <p>{props.message}</p>
      </div>
   ) : null;
   return flashMessage;
};

export default Flash;
