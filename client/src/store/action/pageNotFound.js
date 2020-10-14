import * as actionTypes from "./actionTypes";

const pageNotFound = () => {
   return {
      type: actionTypes.PAGE_NOT_FOUND,
   };
};

export const onPageNotFound = () => (dispatch) => {
   dispatch(pageNotFound());
};
