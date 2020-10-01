import * as actionTypes from "./actionTypes";

const flashStart = (flashMsg) => {
   return {
      type: actionTypes.FLASH_START,
      flashMsg: flashMsg,
   };
};

const flashEnd = () => {
   return {
      type: actionTypes.FLASH_END,
   };
};

export const onFlash = (flashMsg) => (dispatch) => {
   dispatch(flashStart(flashMsg));
   setTimeout(() => {
      dispatch(flashEnd());
   }, 5000);
};
