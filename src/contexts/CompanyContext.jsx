import React, { createContext, useState, useContext } from 'react';

// Criar o contexto
const CompanyContext = createContext();

// Componente provedor
export default function CompanyProvider({ children }) {
  const [appCompanyId, setAppCompany] = useState(null);

  return (
    <CompanyContext.Provider value={{ appCompanyId, setAppCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
