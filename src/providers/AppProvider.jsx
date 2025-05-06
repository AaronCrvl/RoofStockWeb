import React from 'react';
import CompanyProvider from '../contexts/CompanyContext';
import UserProvider from '../contexts/UserContext';

const AppProviders = ({ children }) => {
  return (
    <CompanyProvider>
      <UserProvider>{children}</UserProvider>
    </CompanyProvider>
  );
};

export default AppProviders;
