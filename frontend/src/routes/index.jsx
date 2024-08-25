import { createBrowserRouter } from 'react-router-dom';

// project import
import DashboardRoutes from './DashboardRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PollRoutes from './PollRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [DashboardRoutes, LoginRoutes, MainRoutes, PollRoutes],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
