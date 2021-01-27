import React from "react";
import "./BookList.css";

const BookList = (props) => {
   let bookName = props.bookName;
   let description = props.description;
   if (bookName.length > 30) {
      bookName = props.bookName.substring(0, 30) + "...";
   }
   if (description.length > 40) {
      description = props.description.substring(0, 40) + "...";
   }
   return (
      <div className="BookList">
         <div className="BookList__BookImage">
            <img
               src={require(`../../assets/data/${props.bookCoverName}`)}
               alt={bookName}
               onClick={props.clicked}
            />
         </div>
         <div className="BookList__Body">
            <h2 className="BookList__Body__BookTitle" onClick={props.clicked}>
               {bookName}
            </h2>
            <p>Author : {props.author}</p>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default BookList;
