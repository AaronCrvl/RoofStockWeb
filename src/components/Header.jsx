import React from 'react';

const Header = ({ title, subtitle, goBack, children }) => {
  return (
    <header className="bg-gray-800 mt-8 flex justify-center items-center p-4">
      {goBack && (
        <button onClick={goBack} className="text-white mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <div className="text-center text-white">
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
};

export default Header;
