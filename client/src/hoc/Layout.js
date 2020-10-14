import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Aux from "./Aux";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SlideDraw from "../components/Navigation/SlideDraw/SlideDraw";
import Footer from "../containers/Footer/Footer";

const Layout = (props) => {
   const [isShow, setIsShow] = useState();

   const openSlideDraw = () => {
      setIsShow(true);
   };

   const closeSlideDraw = () => {
      setIsShow(false);
   };

   console.log(props);
   return (
      <Aux>
         <Toolbar clicked={openSlideDraw} />
         <SlideDraw showed={isShow} clicked={closeSlideDraw} />
         {/* App */}
         {props.children}
         <Footer location={props.location} />
      </Aux>
   );
};

export default withRouter(Layout);
