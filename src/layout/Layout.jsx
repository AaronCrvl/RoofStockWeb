import React from "react";
import SideNav from "../components/ui/SideNav";
import Footer from "../components/ui/Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">      
      <div className="w-full md:w-auto md:h-screen">
        <SideNav />
      </div>
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
