import { Navigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext';
import { DASHBOARD_HOME_PAGE, LOGIN_PAGE } from './urls';


export const IsGuest = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to={DASHBOARD_HOME_PAGE} />;
  }
  return children;
};

export const IsLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PAGE} />;
  }
  return children;
};
