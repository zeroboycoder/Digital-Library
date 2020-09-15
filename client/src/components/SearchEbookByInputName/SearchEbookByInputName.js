import React, { useState } from "react";
import "./SearchEbookByInputName.css";

const SearchEbookByInputName = (props) => {
   const [searchText, setSearchText] = useState();

   const inputChangeHandler = (event) => {
      setSearchText({ text: event.target.value });
   };

   const onClick = () => {
      props.history.replace(`/ebooks/searched?_q=${searchText.text}`);
   };

   const canClick = () => {
      let canClick = false;
      if (searchText) {
         canClick = searchText.text.trim() !== "";
      }
      return canClick;
   };

   return (
      <div className="SearchEbookByInputName">
         <input
            type="text"
            placeholder="Search Book"
            onChange={(e) => inputChangeHandler(e)}
         />
         <button onClick={onClick} disabled={!canClick()}>
            Search
         </button>
      </div>
   );
};

export default SearchEbookByInputName;
