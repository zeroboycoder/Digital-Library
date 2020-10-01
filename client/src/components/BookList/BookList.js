import React from "react";
import "./BookList.css";
import cover from "../../assets/ss.png";

const BookList = (props) => {
   let description = props.description;
   if (description.length > 40) {
      description = props.description.substring(0, 40) + "...";
   }
   return (
      <div className="BookList">
         <div className="BookList__BookImage">
            {/* src={props.bookCoverLocation} */}
            <img src={cover} alt={props.bookName} onClick={props.clicked} />
         </div>
         <div className="BookList__Body">
            <h2 className="BookList__Body__BookTitle" onClick={props.clicked}>
               {props.bookName}
            </h2>
            <p>Author : {props.author}</p>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default BookList;
