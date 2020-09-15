import React from "react";
import { clickTag } from "../../../util/helper";
import "./Tag.css";

const Tag = (props) => {
   return (
      <button
         className="Tag"
         onClick={() => clickTag(props.name, props.categoryName, props.props)}
      >
         {props.name}
      </button>
   );
};
export default Tag;
