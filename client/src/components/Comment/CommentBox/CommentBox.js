import React from "react";
import { canClickBtn } from "../../../util/helper";

const CommentBox = (props) => {
   return (
      <div className="EbookDetail__Comment__CommentBox">
         <div>
            <i className="fas fa-user-circle"></i>
            {/* <i className="far fa-user-circle"></i> */}
         </div>
         <form onSubmit={props.formSubmitted}>
            <div className="form-group">
               <div className="EbookDetail__Comment__CommentBox__Text">
                  Comment as
               </div>
               <input
                  type="text"
                  placeholder="Enter your email"
                  value={props.commentForm.email.value}
                  onChange={props.changedEmail}
               />
            </div>
            <div className="form-group">
               <textarea
                  placeholder="Enter your comment"
                  value={props.commentForm.comment.value}
                  onChange={props.changedComment}
               ></textarea>
            </div>
            <button disabled={!canClickBtn(props.commentForm)}>Comment</button>
         </form>
      </div>
   );
};

export default CommentBox;
