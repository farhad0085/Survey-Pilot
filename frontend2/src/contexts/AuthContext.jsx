import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, userInfo } from 'apis/auth';

// Create a Context for the authentication state
const AuthContext = createContext();
const tokenKey = import.meta.env.VITE_APP_AUTH_TOKEN_KEY

// Create a Provider component
export const AuthProvider = ({ children }) => {
   // initially get the state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(tokenKey));
  const [user, setUser] = useState({});

  const register = async (data) => {
    const response = await registerUser(data);
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(tokenKey, response.data.key)
  };

  const loadUserInfo = async () => {
    const response = await userInfo();
    setUser(response.data);
  }

  const login = async (username, password) => {
    const response = await loginUser({ username, password });
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(tokenKey, response.data.key)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // clear localStorage
    localStorage.setItem(tokenKey, '')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout, loadUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
