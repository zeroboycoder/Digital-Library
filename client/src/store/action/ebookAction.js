import * as actionTypes from "./actionTypes";
import axios from "axios";

/* =================== */
/* Fetch All Ebooks */
/* =================== */
const fetchEbookStart = () => {
   return {
      type: actionTypes.FETCH_EBOOKS_START,
   };
};

const fetchEbookSuccess = (ebook_datas, pagination) => {
   return {
      type: actionTypes.FETCH_EBOOKS_SUCCESS,
      ebook_datas: ebook_datas,
      pagination: pagination,
   };
};

const fetchEbookFail = (errMsg) => {
   return {
      type: actionTypes.FETCH_EBOOKS_FAIL,
      errMsg: errMsg,
   };
};

export const onFetchEbook = (query) => (dispatch) => {
   dispatch(fetchEbookStart);
   axios
      .get(`/api/ebooks/fetch${query}`)
      .then((response) => {
         dispatch(
            fetchEbookSuccess(
               response.data.ebook_datas,
               response.data.pagination
            )
         );
      })
      .catch((err) => {
         dispatch(fetchEbookFail(err.response.data.errMsg));
      });
};

/* ===================== */
/* Fetch Detail of Ebook */
/* ===================== */
const fetchDetailOfEbookStart = () => {
   return {
      type: actionTypes.FETCH_DETAIL_OF_EBOOK_START,
   };
};

const fetchDetailOfEbookSuccess = (ebookDetail, suggestionBooks, comments) => {
   return {
      type: actionTypes.FETCH_DETAIL_OF_EBOOK_SUCCESS,
      detail_of_ebook: ebookDetail,
      suggestionBooks: suggestionBooks,
      comments: comments,
   };
};

const fetchDetailOfEbookFail = (errMsg) => {
   return {
      type: actionTypes.FETCH_DETAIL_OF_EBOOK_FAIL,
      errMsg: errMsg,
   };
};

export const onFetchDetailOfEbook = (book_id) => (dispatch) => {
   dispatch(fetchDetailOfEbookStart());
   axios
      .get(`/ebooks/${book_id}`)
      .then((response) => {
         dispatch(
            fetchDetailOfEbookSuccess(
               response.data.ebook,
               response.data.suggestionBooks,
               response.data.ebook.comments
            )
         );
      })
      .catch((err) => {
         dispatch(fetchDetailOfEbookFail(err));
      });
};
