import React from "react";
import "./NoEbookFound.css";

const NoEbookFound = (props) => {
   return (
      <div className="NoEbookFound">
         <div></div>
         <div className="NoEbookFound__MidGroup">
            <h2>Oops!</h2>
            <p>
               The book you are finding is not <br /> available now.
            </p>
         </div>
         <div className="NoEbookFound__BotGroup">
            <p>
               You can <a href="#requestBook">request</a> from Book Request.
            </p>
         </div>
      </div>
   );
};

export default NoEbookFound;
