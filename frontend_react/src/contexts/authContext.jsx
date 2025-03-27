import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken , setAccessToken] = useState(localStorage.getItem('access'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access', accessToken);
    } else {
      localStorage.removeItem('access');
    }
    
    if (refreshToken) {
      localStorage.setItem('refresh', refreshToken);
    } else {
      localStorage.removeItem('refresh');
    }
  }, [accessToken, refreshToken])

  const contextValue = {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  }

  return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext)