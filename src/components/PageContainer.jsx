import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <div className="overflow-auto p-2 bg-white flex-1">
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default PageContainer;
