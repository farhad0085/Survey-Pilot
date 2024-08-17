import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser } from '../api';

// Create a Context for the authentication state
const AuthContext = createContext();
const tokenKey = process.env.REACT_APP_AUTH_TOKEN_KEY

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    try {
      const response = await registerUser({ email, password });
      setIsAuthenticated(true);
      setUser(response.data);
      localStorage.setItem(tokenKey, response.data.key)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      setIsAuthenticated(true);
      setUser(response.data);
      localStorage.setItem(tokenKey, response.data.key)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // clear localStorage
    localStorage.setItem(tokenKey, '')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
