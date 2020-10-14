import * as actionTypes from "../action/actionTypes";

const initState = {
   flashMsg: "",
   flashType: "",
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.FLASH_START:
         return {
            flashMsg: action.flashMsg,
            flashType: action.flashType,
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
