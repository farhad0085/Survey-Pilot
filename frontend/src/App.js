import React, { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import AllRoutes from './routes/Routes';

const App = () => {

  const { isAuthenticated, loadUserInfo } = useAuth()

  useEffect(() => {
    async function callUserInfo() {
      if (isAuthenticated) {
        try {
          await loadUserInfo();
        } catch (error) {
          console.log("Error loading user info:", error)
        }
      }
    }
    callUserInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <AllRoutes />
  );
};

export default App;
