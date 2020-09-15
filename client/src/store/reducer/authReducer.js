import * as actionTypes from "../action/actionTypes";

const initState = {
   token: localStorage.getItem("token"),
   username: null,
   email: null,
   authErrMsg: null,
   authLoading: false,
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.SIGN_UP_START:
      case actionTypes.SIGN_IN_START:
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
            username: action.user.username,
            email: action.user.email,
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
      case actionTypes.LOAD_USER_SUCCESS: {
         return {
            ...state,
            username: action.user.username,
            email: action.user.email,
            authLoading: false,
         };
      }
      case actionTypes.LOAD_USER_FAIL: {
         return {
            ...state,
            authErrMsg: action.authErrMsg,
            authLoading: false,
         };
      }
      case actionTypes.LOGOUT_SUCCESS: {
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            username: null,
            email: null,
         };
      }
      default:
         return state;
   }
};

export default reducer;
