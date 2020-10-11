import * as actionTypes from "../action/actionTypes";

const initState = {
   flashMsg: "",
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.FLASH_START:
         return {
            flashMsg: action.flashMsg,
         };
      case actionTypes.FLASH_END:
         return {
            flashMsg: "",
         };
      default:
         return state;
   }
};

export default reducer;
