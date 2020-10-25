import * as actionTypes from "../action/actionTypes";

const initState = {
   token: localStorage.getItem("token"),
   userId: null,
   username: null,
   email: null,
   major: null,
   authErrMsg: null,
   authLoading: false,
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.SIGN_UP_START:
      case actionTypes.SIGN_IN_START:
      case actionTypes.EDIT_AUTH_START:
      case actionTypes.LOAD_USER_START:
         return {
            ...state,
            authLoading: true,
         };
      case actionTypes.SIGN_UP_SUCCESS:
      case actionTypes.SIGN_IN_SUCCESS:
         localStorage.setItem("token", action.token);
         return {
            ...state,
            token: action.token,
            userId: action.user.userId,
            username: action.user.username,
            email: action.user.email,
            major: action.user.major,
            authLoading: false,
         };
      case actionTypes.SIGN_UP_FAIL:
      case actionTypes.SIGN_IN_FAIL:
         localStorage.setItem("token", null);
         return {
            ...state,
            authErrMsg: action.authErrMsg,
            authLoading: false,
         };
      // For edit authentications
      case actionTypes.EDIT_AUTH_SUCCESS:
         return {
            ...state,
            username: action.user.username,
            email: action.user.email,
            authLoading: false,
         };
      case actionTypes.EDIT_AUTH_FAIL:
         return {
            ...state,
            authErrMsg: action.errMsg,
            authLoading: false,
         };
      case actionTypes.LOAD_USER_SUCCESS: {
         return {
            ...state,
            userId: action.user._id,
            username: action.user.username,
            email: action.user.email,
            major: action.user.major,
            authLoading: false,
         };
      }
      case actionTypes.LOAD_USER_FAIL: {
         return {
            ...state,
            authLoading: false,
         };
      }
      case actionTypes.LOGOUT_SUCCESS: {
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            userId: null,
            username: null,
            email: null,
            major: null,
         };
      }
      default:
         return state;
   }
};

export default reducer;
