import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useAuth } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { showErrorMessage } from 'utils/toast';

export default function App() {
  
  const { isAuthenticated, loadUserInfo } = useAuth()

  useEffect(() => {
    async function callUserInfo() {
      if (isAuthenticated) {
        try {
          await loadUserInfo();
        } catch (error) {
          showErrorMessage("Error loading user info:", error)
        }
      }
    }
    callUserInfo()
    // eslint-disable-next-line
  }, [])

  return (
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeCustomization>
  );
}
