import React, { useEffect } from 'react';
import BaseLayout from './layouts/BaseLayout';
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
    <BaseLayout>
      <AllRoutes />
    </BaseLayout>
  );
};

export default App;
