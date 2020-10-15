import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as action from "./rootActions";

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

export const onAddEbook = (data, bookName) => (dispatch) => {
   dispatch(addEbookStart());
   axios
      .post("/api/ebooks/add", data)
      .then((response) => {
         dispatch(addEbookSuccess());
         dispatch(action.onFlash("Ebook uploaded successfully", "success"));
      })
      .catch((err) => {
         dispatch(action.onFlash(err.response.data.errMsg, "fail"));
         dispatch(addEbookFail(err.response.data.errMsg));
      });
};
