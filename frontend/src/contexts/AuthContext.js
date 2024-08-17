import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, userInfo } from '../api';

// Create a Context for the authentication state
const AuthContext = createContext();
const tokenKey = process.env.REACT_APP_AUTH_TOKEN_KEY

// Create a Provider component
export const AuthProvider = ({ children }) => {
   // initially get the state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(tokenKey));
  const [user, setUser] = useState(null);

  const register = async (data) => {
    try {
      const response = await registerUser(data);
      setIsAuthenticated(true);
      setUser(response.data);
      localStorage.setItem(tokenKey, response.data.key)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const loadUserInfo = async () => {
    try {
      const response = await userInfo();
      setUser(response.data);
    } catch (error) {
      console.error('Loading user data failed:', error);
    }
  }

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
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
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout, loadUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
