import { createBrowserRouter } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PollRoutes from './PollRoutes';

const routes = [
  ...DashboardRoutes,
  ...LoginRoutes,
  ...MainRoutes,
  ...PollRoutes
]
const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
