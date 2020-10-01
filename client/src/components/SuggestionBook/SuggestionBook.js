import React from "react";
import "./SuggestionBook.css";
import { withRouter } from "react-router-dom";
import { clickedLink } from "../../util/helper";
import cover from "../../assets/ss.png";

const SuggestionBook = (props) => {
   return (
      <div className="SuggestionBook">
         <div
            className="SuggestionBook__BookCover"
            onClick={() => clickedLink(props._id, props)}
         >
            {/* src={props.bookCoverLocation} */}
            <img src={cover} alt={props.bookName} />
         </div>
         <div className="SuggestionBook__Body">
            <p
               className="SuggestionBook__Body__BookName"
               onClick={() => clickedLink(props._id, props)}
            >
               {props.bookName}
            </p>
            <p className="SuggestionBook__Body__Author">{props.author}</p>
         </div>
      </div>
   );
};

export default withRouter(SuggestionBook);
