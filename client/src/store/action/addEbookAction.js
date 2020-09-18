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

export const onAddEbook = (data, props) => (dispatch) => {
   dispatch(addEbookStart());
   axios
      .post("/api/ebooks/add", data)
      .then((response) => {
         dispatch(addEbookSuccess());
         props.history.push("/");
      })
      .catch((err) => {
         console.log(err);
         dispatch(addEbookFail(err));
      });
};
