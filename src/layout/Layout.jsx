import React, { useState } from 'react';
import TopBar from '../components/TopBar';

function Layout({ children }) {
  const isLogin = true;
  const [selectedCompany, setSelectedCompany] = useState('companyA');

  return (
    <div className="bg-blue-100">
      {isLogin ? (
        <div className="flex flex-col w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Conditionally render TopBar */}
          {true && (
            <TopBar
              selectedCompany={selectedCompany}
              onCompanyChange={setSelectedCompany}
            />
          )}

          <div className="flex-1 overflow-y-auto p-6">
            {/* The content section */}
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          {/* Content for users not logged in */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Please log in to continue.
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
