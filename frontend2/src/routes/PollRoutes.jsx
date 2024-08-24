import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { IsLoggedIn } from './RouteTypes';
import * as URLS from './urls';
import DashboardLayout from 'layout/Dashboard';

const ListPollPage = Loadable(lazy(() => import('pages/dashboard/admin/poll/ListPoll')));

// ==============================|| MAIN ROUTING ||============================== //

const PollRoutes = {
  path: '',
  element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
  children: [
    {
      path: URLS.LIST_POLL_PAGE,
      element: <ListPollPage />
    },
  ]
};

export default PollRoutes;
