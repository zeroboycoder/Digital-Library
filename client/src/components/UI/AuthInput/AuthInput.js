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
               {props.reviewPwIcon ? (
                  <div
                     className="AuthInput__ReviewPw"
                     onClick={props.reviewPassword}
                  >
                     {props.reviewPwIcon}
                  </div>
               ) : null}
            </div>
            <div>{errMsg}</div>
         </div>
      );
   }
   // If element type will select (option)
   if (props.elementtype === "select") {
      const option = props.options.map((option) => (
         <option value={option.value} key={option.value}>
            {option.name}
         </option>
      ));
      input = (
         <div className="AuthInput">
            <div className="AuthInput__InputSection">
               {props.label && (
                  <label className="AuthInput__Select__Label">
                     {props.label}
                  </label>
               )}
               <select
                  className="AuthInput__Select"
                  onChange={props.changed}
                  required
               >
                  {option}
               </select>
            </div>
            <div>{errMsg}</div>
         </div>
      );
   }
   // If element type will textarea
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
