import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { IsLoggedIn } from './RouteTypes';
import * as URLS from './urls';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const ListPollPage = Loadable(lazy(() => import('pages/dashboard/admin/poll/ListPoll')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: URLS.DASHBOARD_PAGE,
  element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
  children: [
    {
      path: '',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: URLS.LIST_POLL_PAGE,
      element: <ListPollPage />
    },
  ]
};

export default MainRoutes;
