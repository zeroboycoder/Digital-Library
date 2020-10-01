import React from "react";
import "./BookRequest.css";

const BookRequest = (props) => {
   return (
      <div className="BookRequest">
         <form onSubmit={props.formSubmit}>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="Book Name"
                  value={props.value}
                  className="BookRequest__Input"
                  onChange={props.inputChanged}
               />
            </div>
            <div className="form-group">
               <select
                  className="BookRequest__Input"
                  onChange={props.selectChanged}
               >
                  <option value="">Select the major:</option>
                  <option value="civil">Civil</option>
                  <option value="ec">Electronic</option>
                  <option value="ep">Electrical Power</option>
                  <option value="mech">Mechanical</option>
                  <option value="it">Information Technology</option>
               </select>
            </div>
            <div className="BookRequest__Button">
               <button type="submit">Request</button>
            </div>
         </form>
      </div>
   );
};

export default BookRequest;
