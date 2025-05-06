import React, { createContext, useState, useContext } from 'react';

// Create the context
const CompanyContext = createContext();

// Provider component
export default function CompanyProvider({ children }) {
  const [appCompanyId, setAppCompany] = useState(null);

  return (
    <CompanyContext.Provider value={{ appCompanyId, setAppCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

// Custom hook for accessing the context
export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
