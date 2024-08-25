import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, userInfo } from 'apis/auth';
import ls from 'localstorage-slim';

// Create a Context for the authentication state
const AuthContext = createContext();
const tokenKey = import.meta.env.VITE_APP_AUTH_TOKEN_KEY

// Create a Provider component
export const AuthProvider = ({ children }) => {
   // initially get the state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!ls.get(tokenKey));
  const [user, setUser] = useState({});

  const register = async (data) => {
    const response = await registerUser(data);
    setIsAuthenticated(true);
    setUser(response.data);
    ls.set(tokenKey, response.data.key)
  };

  const loadUserInfo = async () => {
    const response = await userInfo();
    setUser(response.data);
  }

  const login = async (username, password, rememberMe) => {
    const response = await loginUser({ username, password });
    setIsAuthenticated(true);
    setUser(response.data);
    if (rememberMe) {
      ls.set(tokenKey, response.data.key)
    }
    else {
      ls.set(tokenKey, response.data.key, { ttl: 1800 }) // set the token for 30 minutes
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // clear localStorage
    ls.remove(tokenKey)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout, loadUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
