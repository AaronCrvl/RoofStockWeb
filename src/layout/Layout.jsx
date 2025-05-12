import React from "react";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-min">
          <SideNav />
        </div>
        <div className="w-full">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
