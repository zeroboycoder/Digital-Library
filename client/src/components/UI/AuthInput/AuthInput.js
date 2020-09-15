import React from "react";
import "./AuthInput.css";

const AuthInput = (props) => {
   let input = "";
   let classes = [];
   let errMsg = null;
   let labelStyle = [];
   // Assign the invalid border color
   if (props.invalid && props.touched) {
      classes.push("border-danger text-danger");
      errMsg = <small className="Input__ErrorMessage">{props.errMsg}</small>;
      labelStyle.push("text-danger");
   }

   if (props.value) {
      labelStyle.push("LabelTop");
   }

   // If element type will input
   if (props.elementtype === "input") {
      input = (
         <div className="AuthInput">
            <div className="AuthInput__InputSection">
               <input
                  {...props.elementconfig}
                  value={props.value}
                  className={classes.join(" ")}
                  onChange={props.changed}
                  required
               />
               {props.label && (
                  <label className={labelStyle.join(" ")}>{props.label}</label>
               )}
            </div>
            <div>{errMsg}</div>
         </div>
      );
   }
   if (props.elementtype === "textarea") {
      labelStyle.push("TextareaLabel");
      input = (
         <div className="AuthInput">
            <div className="AuthInput__InputSection">
               <textarea
                  className={classes.join(" ")}
                  onChange={props.changed}
                  required
               ></textarea>
               {props.label && (
                  <label className={labelStyle.join(" ")}>{props.label}</label>
               )}
            </div>
            <div>{errMsg}</div>
         </div>
      );
   }
   return input;
};

export default AuthInput;
