import React, { useState } from "react";
import Aux from "./Aux";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SlideDraw from "../components/Navigation/SlideDraw/SlideDraw";

const Layout = (props) => {
   const [isShow, setIsShow] = useState();

   const openSlideDraw = () => {
      setIsShow(true);
   };

   const closeSlideDraw = () => {
      setIsShow(false);
   };

   return (
      <Aux>
         <Toolbar clicked={openSlideDraw} />
         <SlideDraw showed={isShow} clicked={closeSlideDraw} />
         {/* App */}
         {props.children}
      </Aux>
   );
};

export default Layout;
