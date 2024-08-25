import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { IsLoggedIn } from './RouteTypes';
import * as URLS from './urls';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));


const DashboardRoutes = [
  {
    path: URLS.DASHBOARD_PAGE,
    element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
    children: [
      {
        path: URLS.DASHBOARD_HOME_PAGE,
        element: <DashboardDefault />
      },
    ]
  }
];

export default DashboardRoutes;
