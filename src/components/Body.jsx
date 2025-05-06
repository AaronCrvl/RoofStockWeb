import React from 'react';

const Body = ({ children }) => {
  return (
    <div className="flex-1 bg-white my-4 mx-3 p-6 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Body;
