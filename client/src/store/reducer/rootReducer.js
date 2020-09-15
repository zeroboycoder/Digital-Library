import { combineReducers } from "redux";
import ebookReducer from "./ebookReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
   ebook: ebookReducer,
   auth: authReducer,
});

export default rootReducer;
