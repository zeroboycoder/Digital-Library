import React from "react";
import "./Input.css";

const Input = (props) => {
   let input = "";
   let classes = [];
   let errMsg = null;
   // Assign the invalid border color
   if (props.invalid && props.touched) {
      classes.push("border-danger text-danger");
      errMsg = <small className="Input__ErrorMessage">{props.errMsg}</small>;
   }

   // Assign the css class based on element type
   props.elementconfig.type === "file"
      ? classes.push("fileInput")
      : classes.push("form-control");

   // If element type will input
   if (props.elementtype === "input") {
      input = (
         <div className="Input">
            <div className="Input__Label">
               {props.label && <label>{props.label}</label>}
            </div>
            <div className="Input__InputBox">
               <input
                  {...props.elementconfig}
                  value={props.value}
                  className={classes.join(" ")}
                  onChange={props.changed}
               />
               <small className="mt-1">{props.guideLine}</small>
               {errMsg}
               {props.previewImage &&
                  !props.invalid &&
                  props.label === "Book Cover" && (
                     <img
                        className="Input__PreviewImage"
                        src={props.previewImage}
                        alt="Preview Book Cover"
                        style={{ width: "120px", marginTop: "20px" }}
                     />
                  )}
            </div>
         </div>
      );
   }

   // If element type will textarea
   if (props.elementtype === "textarea") {
      input = (
         <div className="Input">
            <div className="Input__Label">
               {props.label && (
                  <label className="Input__Label">{props.label}</label>
               )}
            </div>
            <div className="Input__InputBox">
               <textarea
                  {...props.elementconfig}
                  className={classes.join(" ")}
                  onChange={props.changed}
               >
                  {props.value}
               </textarea>
               {errMsg}
            </div>
         </div>
      );
   }
   return input;
};

export default Input;
