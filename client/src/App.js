import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./hoc/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import * as actions from "./store/action/rootActions";
import Home from "./containers/Home/Home";
import AddEbook from "./containers/AddEbook/AddEbook";
import EbookDetail from "./containers/EbookDetail/EbookDetail";
import SearchEbookByCategory from "./containers/SearchEbookByCategory/SearchEbookByCategory";
import SearchEbooksByInputName from "./containers/SearchEbooksByInputName/SearchEbooksByInputName";
import Setting from "./containers/Setting/Setting";
import SignUp from "./containers/auth/signup/signup";
import SignIn from "./containers/auth/signin/signin";

class App extends Component {
   state = {};
   static getDerivedStateFromProps(props) {
      if (props.token) {
         // props.onLoadUser();
      }
      return true;
   }
   render() {
      return (
         <Layout>
            <Switch>
               <Route path="/auth/signup" component={SignUp} />
               <Route path="/auth/signin" component={SignIn} />

               <Route path="/add-ebook" component={AddEbook} />
               <Route
                  path="/ebooks/searched"
                  component={SearchEbooksByInputName}
               />
               <Route path="/ebooks/:book_id" component={EbookDetail} />
               <Route
                  path="/categories/:searched_category/:type"
                  component={SearchEbookByCategory}
               />
               <Route
                  path="/categories/:searched_category/"
                  component={SearchEbookByCategory}
               />
               <Route path="/setting" component={Setting} />
               <Route path="/" exact component={Home} />
            </Switch>
         </Layout>
      );
   }
}

const stateToProps = (state) => {
   return {
      token: state.auth.token,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLoadUser: () => dispatch(actions.onLoadUser()),
   };
};

export default connect(stateToProps, dispatchToProps)(App);
