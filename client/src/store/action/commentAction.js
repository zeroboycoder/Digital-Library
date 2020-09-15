import axios from "axios";
import * as actionTypes from "./actionTypes";

const addCommentSuccess = (cmt) => {
   return {
      type: actionTypes.ADD_COMMENT_SUCCESS,
      cmt: cmt,
   };
};

const addCommentFail = (errMsg) => {
   return {
      type: actionTypes.ADD_COMMENT_FAIL,
      errMsg: errMsg,
   };
};

export const onAddComment = (book_id, data) => (dispatch) => {
   axios
      .post(`/api/comment/${book_id}`, data)
      .then((response) => {
         dispatch(addCommentSuccess(response.data.cmt));
      })
      .catch((err) => {
         dispatch(addCommentFail(err.response.data));
      });
};
