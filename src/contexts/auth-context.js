import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("gstore-auth")) || 0);
  
  return (
    <AuthContext.Provider value={{auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
