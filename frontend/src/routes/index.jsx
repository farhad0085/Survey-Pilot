import { createBrowserRouter } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PollRoutes from './PollRoutes';
import SurveyRoutes from './SurveyRoutes';

const routes = [
  ...DashboardRoutes,
  ...LoginRoutes,
  ...MainRoutes,
  ...PollRoutes,
  ...SurveyRoutes,
]
const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
