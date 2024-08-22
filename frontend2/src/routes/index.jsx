import { createBrowserRouter } from 'react-router-dom';

// project import
import DashboardRoutes from './DashboardRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [DashboardRoutes, LoginRoutes, MainRoutes],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
