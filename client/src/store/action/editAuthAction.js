import axios from "axios";
import * as actionTypes from "./actionTypes";

const editAuthStart = () => {
   return {
      type: actionTypes.EDIT_AUTH_START,
   };
};

const editAuthSuccess = (user) => {
   return {
      type: actionTypes.EDIT_AUTH_SUCCESS,
      user: user,
   };
};

const editAuthFail = (err) => {
   return {
      type: actionTypes.EDIT_AUTH_FAIL,
      errMsg: err,
   };
};

export const onEditAuth = (data) => (dispatch) => {
   dispatch(editAuthStart());
   axios
      .post("/api/auth/edit", data)
      .then((response) => dispatch(editAuthSuccess(response.data.user)))
      .catch((err) => dispatch(editAuthFail(err)));
};
