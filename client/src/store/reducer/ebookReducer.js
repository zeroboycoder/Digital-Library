import * as actionTypes from "../action/actionTypes";

const initState = {
   ebook_datas: [],
   searched_ebook_datas: [],
   detail_of_ebook: null,
   suggestionBooks: [],
   comments: [],
   tags: [],
   categoryName: null,
   pagination: {},
   errMsg: null,
   loading: false,
};

const ebookReducer = (state = initState, action) => {
   switch (action.type) {
      /* Fetch Ebooks */
      case actionTypes.FETCH_EBOOKS_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.FETCH_EBOOKS_SUCCESS:
         return {
            ...state,
            ebook_datas: action.ebook_datas,
            pagination: action.pagination,
            loading: false,
         };
      case actionTypes.FETCH_EBOOKS_FAIL:
         return {
            ...state,
            errMsg: action.errMsg,
            loading: false,
         };
      /* Fetch Detail of Ebook */
      case actionTypes.FETCH_DETAIL_OF_EBOOK_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.FETCH_DETAIL_OF_EBOOK_SUCCESS:
         return {
            ...state,
            detail_of_ebook: action.detail_of_ebook,
            suggestionBooks: action.suggestionBooks,
            comments: action.comments,
            loading: false,
         };
      case actionTypes.FETCH_DETAIL_OF_EBOOK_FAIL:
         return {
            ...state,
            loading: false,
            errMsg: action.errMsg,
         };
      /* Add Ebook Reducer */
      case actionTypes.ADD_EBOOK_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.ADD_EBOOK_SUCCESS:
         return {
            ...state,
            loading: false,
         };
      case actionTypes.ADD_EBOOK_FAIL:
         return {
            ...state,
            loading: false,
         };
      /* Search Ebook By Category */
      case actionTypes.SEARCH_EBOOKS_BY_CATEGORY_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.SEARCH_EBOOKS_BY_CATEGORY_SUCCESS:
         return {
            ...state,
            searched_ebook_datas: action.searched_ebook_datas,
            tags: action.tags,
            categoryName: action.categoryName,
            pagination: action.pagination,
            loading: false,
         };
      case actionTypes.SEARCH_EBOOKS_BY_CATEGORY_FAIL:
         return {
            ...state,
            errMsg: action.errMsg,
            loading: false,
         };
      /* Search Ebook By Input Name */
      case actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_SUCCESS:
         return {
            ...state,
            ebook_datas: action.ebook_datas,
            loading: false,
         };
      case actionTypes.SEARCH_EBOOKS_BY_INPUT_NAME_FAIL:
         return {
            ...state,
            loading: false,
            errMsg: action.errMsg,
         };
      /* Add Comment to specific ebook */
      case actionTypes.ADD_COMMENT_SUCCESS:
         return {
            ...state,
            comments: action.cmt,
            loading: false,
         };
      case actionTypes.ADD_EBOOK_FAIL:
         return {
            ...state,
            loading: false,
         };
      default:
         return state;
   }
};

export default ebookReducer;
