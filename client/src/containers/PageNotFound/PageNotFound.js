import React, { Component } from "react";
import { connect } from "react-redux";
import "./PageNotFound.css";
import { onPageNotFound } from "../../store/action/rootActions";

class PageNotFound extends Component {
   componentDidMount() {
      this.props.onPageNotFound();
   }

   render() {
      return (
         <div className="PageNotFound">
            <div className="row PageNotFound__Body">
               <div className="col col-xs-12 col-md-6 PageNotFound__Left">
                  <h1>Oops!</h1>
                  <h2>Page not found!</h2>
                  <p>
                     Unable to find the page you <br />
                     are looking for
                  </p>
               </div>
               <div className="col col-xs-12 col-md-6 PageNotFound__Right">
                  <h1>404</h1>
               </div>
            </div>
         </div>
      );
   }
}

const dispatchToProps = (dispatch) => {
   return {
      onPageNotFound: () => dispatch(onPageNotFound()),
   };
};

export default connect(null, dispatchToProps)(PageNotFound);
