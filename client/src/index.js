import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import rootReducer from "./store/reducer/rootReducer";

// const composeEnhancers =
//    process.env.NODE_ENV === "development"
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,
   document.getElementById("root")
);
