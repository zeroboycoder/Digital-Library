import * as actionTypes from "./actionTypes";
import * as actions from "./rootActions";
import axios from "axios";

/* ============= */
// For Load User
/* ============= */
const loadUserStart = () => {
   return {
      type: actionTypes.LOAD_USER_START,
   };
};

const loadUserSuccess = (user) => {
   return {
      type: actionTypes.LOAD_USER_SUCCESS,
      user: user,
   };
};

const loadUserFail = (errMsg) => {
   return {
      type: actionTypes.LOAD_USER_FAIL,
      authErrMsg: errMsg,
   };
};

export const onLoadUser = () => (dispatch, getState) => {
   dispatch(loadUserStart());
   const token = getState().auth.token;
   axios
      .get("/api/user", {
         headers: {
            "elib-auth-token": token,
         },
      })
      .then((response) => dispatch(loadUserSuccess(response.data.user)))
      .catch((err) => dispatch(loadUserFail(err.response.data)));
};

/* ============= */
// For Signup
/* ============= */
const signUpStart = () => {
   return {
      type: actionTypes.SIGN_UP_START,
   };
};

const signUpSuccess = (token, user) => {
   return {
      type: actionTypes.SIGN_UP_SUCCESS,
      token: token,
      user: user,
   };
};

const signUpFail = (err) => {
   return {
      type: actionTypes.SIGN_UP_FAIL,
      authErrMsg: err,
   };
};

export const onSignUp = (data, props) => (dispatch) => {
   dispatch(signUpStart());
   axios
      .post("/api/auth/signup", data)
      .then((response) => {
         dispatch(signUpSuccess(response.data.token, response.data.user));
         // props.history.replace("/");
      })
      .catch((err) => {
         console.log(err);
         dispatch(signUpFail(err));
      });
};

/* ============= */
// For Signin
/* ============= */
const signInStart = () => {
   return {
      type: actionTypes.SIGN_IN_START,
   };
};

const signInSuccess = (token, user) => {
   return {
      type: actionTypes.SIGN_IN_SUCCESS,
      token: token,
      user: user,
   };
};

const signInFail = (err) => {
   return {
      type: actionTypes.SIGN_IN_FAIL,
      authErrMsg: err,
   };
};

export const onSignIn = (data, props) => (dispatch) => {
   dispatch(signInStart());
   axios
      .post("/api/auth/signin", data)
      .then((response) => {
         console.log(response.data);
         dispatch(signInSuccess(response.data.token, response.data.user));
         props.history.push("/");
      })
      .catch((err) => {
         console.log(err.response.data);
         dispatch(signInFail(err.response.data));
      });
};

/* ============= */
// For Logout
/* ============= */
const logOutSuccess = () => {
   return {
      type: actionTypes.LOGOUT_SUCCESS,
   };
};

export const onLogOut = (props) => (dispatch) => {
   try {
      dispatch(logOutSuccess());
      dispatch(actions.onFetchEbook());
      props.history.push("/");
   } catch (error) {
      console.log(error);
   }
};
