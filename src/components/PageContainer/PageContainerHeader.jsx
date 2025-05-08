import React from "react";

function Header ({ title, children }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg">
      <h1 className="text-6xl font-bold text-black">{title}</h1>
      <div>{children}</div>
    </header>
  );
};

export default Header;
