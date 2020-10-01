import { combineReducers } from "redux";
import ebookReducer from "./ebookReducer";
import authReducer from "./authReducer";
import flashReducer from "./flashReducer";

const rootReducer = combineReducers({
   ebook: ebookReducer,
   auth: authReducer,
   flash: flashReducer,
});

export default rootReducer;
