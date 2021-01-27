import React from "react";
import "./SuggestionBook.css";
import { withRouter } from "react-router-dom";
import { clickedLink } from "../../util/helper";

const SuggestionBook = (props) => {
   return (
      <div className="SuggestionBook">
         <div
            className="SuggestionBook__BookCover"
            onClick={() => clickedLink(props._id, props)}
         >
            <img
               src={require(`../../assets/data/${props.bookCoverName}`)}
               alt={props.bookName}
            />
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
