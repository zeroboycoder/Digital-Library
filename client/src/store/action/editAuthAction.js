import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as actions from "./rootActions";

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

export const onEditAuth = (data, label) => (dispatch) => {
   const labelName = label[0].toUpperCase() + label.slice(1);
   dispatch(editAuthStart());
   axios
      .post("/api/auth/edit", data)
      .then((response) => {
         dispatch(editAuthSuccess(response.data.user));
         dispatch(
            actions.onFlash(`${labelName} changed successfully`, "success")
         );
      })
      .catch((err) => dispatch(editAuthFail(err)));
};
