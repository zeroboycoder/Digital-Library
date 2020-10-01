import * as actionTypes from "../action/actionTypes";

const initState = {
   showFlash: false,
   flashMsg: "",
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.FLASH_START:
         return {
            showFlash: true,
            flashMsg: action.flashMsg,
         };
      case actionTypes.FLASH_END:
         return {
            showFlash: false,
            flashMsg: "",
         };
      default:
         return state;
   }
};

export default reducer;
