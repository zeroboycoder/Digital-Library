import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "./Aux";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SlideDraw from "../components/Navigation/SlideDraw/SlideDraw";
import Footer from "../containers/Footer/Footer";
import Flash from "../components/UI/Flash/Flash";

const Layout = (props) => {
   const [isShow, setIsShow] = useState();

   const openSlideDraw = () => {
      setIsShow(true);
   };

   const closeSlideDraw = () => {
      setIsShow(false);
   };

   // Flash Message
   let flashMessage;
   if (props.flashMsg && !props.loading) {
      console.log(props.flashMsg);
      flashMessage = <Flash message={props.flashMsg} type={props.flashType} />;
   }

   return (
      <Aux>
         <Toolbar clicked={openSlideDraw} />
         <SlideDraw showed={isShow} clicked={closeSlideDraw} />
         {flashMessage}
         {/* App */}
         {props.children}
         <Footer location={props.location} />
      </Aux>
   );
};

const stateToProps = (state) => {
   return {
      loading: state.ebook.loading,
      flashMsg: state.flash.flashMsg,
      flashType: state.flash.flashType,
   };
};

export default connect(stateToProps)(withRouter(Layout));
