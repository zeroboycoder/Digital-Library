import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as actions from "./rootActions";

// Request the book
const bookRequestStart = () => {
   return {
      type: actionTypes.BOOK_REQUEST_START,
   };
};

const bookRequestSuccess = () => {
   return {
      type: actionTypes.BOOK_REQUEST_SUCCESS,
   };
};

const bookRequestFail = () => {
   return {
      type: actionTypes.BOOK_REQUEST_FAIL,
   };
};

export const onBookRequest = (data) => (dispatch) => {
   dispatch(bookRequestStart());
   axios
      .post("/api/ebooks/request", data)
      .then((response) => {
         dispatch(bookRequestSuccess());
         dispatch(actions.onFlash("Thank you for you request.", "success"));
      })
      .catch((err) => {
         dispatch(bookRequestFail());
      });
};

// Website Feedback
export const onFeedback = (data) => (dispatch) => {
   axios.post("/api/feedback", data).then((response) => {
      dispatch(actions.onFlash("Thanks for your feedback","success"));
   });
};
