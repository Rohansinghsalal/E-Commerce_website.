import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const LayoutNotFooter = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutNotFooter;
