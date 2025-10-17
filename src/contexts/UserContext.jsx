import React, { createContext, useState, useContext } from 'react';

// Criar o contexto
const UserContext = createContext();

// Componente provedor
export default function UserProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [userId, setUserId] = useState(null);  
  const [admin, setAdmin] = useState(false);

  const value = {
    logged,
    setLogged,
    userId,
    setUserId,
    admin,
    setAdmin,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
