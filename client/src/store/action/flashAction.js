import * as actionTypes from "./actionTypes";

const flashStart = (flashMsg, flashType) => {
   return {
      type: actionTypes.FLASH_START,
      flashMsg,
      flashType,
   };
};

const flashEnd = () => {
   return {
      type: actionTypes.FLASH_END,
   };
};

export const onFlash = (flashMsg, flashType) => (dispatch) => {
   dispatch(flashStart(flashMsg, flashType));
   setTimeout(() => {
      dispatch(flashEnd());
   }, 5000);
};
