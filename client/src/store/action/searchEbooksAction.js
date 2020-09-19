import * as actionTypes from "./actionTypes";
import axios from "axios";

// =========================
// Search Ebooks By Category
// =========================
const serachEbooksByCategoryStart = () => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_CATEGORY_START,
   };
};

const serachEbooksByCategorySuccess = (
   ebook_datas,
   tags,
   categoryName,
   pagination
) => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_CATEGORY_SUCCESS,
      searched_ebook_datas: ebook_datas,
      tags: tags,
      categoryName: categoryName,
      pagination: pagination,
   };
};

const serachEbooksByCategoryFail = (errMsg) => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_CATEGORY_FAIL,
      errMsg: errMsg,
   };
};

export const onSerachEbooksByCategory = (searchedName, type, query) => {
   let pageNum;
   query ? (pageNum = query) : (pageNum = "");
   return (dispatch) => {
      dispatch(serachEbooksByCategoryStart());
      axios
         .get(`/categories/${searchedName}/${type}${pageNum}`)
         .then((response) => {
            dispatch(
               serachEbooksByCategorySuccess(
                  response.data.ebook_datas,
                  response.data.tags,
                  response.data.categoryName,
                  response.data.pagination
               )
            );
         })
         .catch((err) => {
            dispatch(serachEbooksByCategoryFail(err));
         });
   };
};

// ===========================
// Search Ebooks By Input Name
// ===========================
const searchEbooksByInputNameStart = () => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_START,
   };
};

const searchEbooksByInputNameSuccess = (ebook_datas) => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_SUCCESS,
      ebook_datas: ebook_datas,
   };
};

const searchEbooksByInputNameFail = (errMsg) => {
   return {
      type: actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_FAIL,
      errMsg: errMsg,
   };
};

export const onSearchEbooksByInputName = (query) => (dispatch) => {
   dispatch(searchEbooksByInputNameStart());
   axios
      .get(`/api/ebooks/searched/${query}`)
      .then((response) => {
         dispatch(searchEbooksByInputNameSuccess(response.data.ebook_datas));
      })
      .catch((err) => {
         dispatch(searchEbooksByInputNameFail(err));
      });
};
