import axios from "axios";
import * as actionTypes from "./actionTypes";

const addEbookStart = () => {
   return {
      type: actionTypes.ADD_EBOOK_START,
   };
};

const addEbookSuccess = () => {
   return {
      type: actionTypes.ADD_EBOOK_SUCCESS,
   };
};

const addEbookFail = (errMsg) => {
   return {
      type: actionTypes.ADD_EBOOK_FAIL,
      errMsg: errMsg,
   };
};

export const onAddEbook = (data) => (dispatch) => {
   dispatch(addEbookStart());
   axios
      .post("/api/ebooks/add", data)
      .then((response) => {
         console.log("Added Ebook");
         console.log(response.data);
         dispatch(addEbookSuccess());
      })
      .catch((err) => {
         console.log(err);
         dispatch(addEbookFail(err));
      });
};
