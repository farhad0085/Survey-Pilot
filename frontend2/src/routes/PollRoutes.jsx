import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { IsLoggedIn } from './RouteTypes';
import * as URLS from './urls';
import DashboardLayout from 'layout/Dashboard';

const ListPollPage = Loadable(lazy(() => import('pages/dashboard/admin/poll/ListPoll')));
const CreatePollPage = Loadable(lazy(() => import('pages/dashboard/admin/poll/CreatePoll')));
const UpdatePollPage = Loadable(lazy(() => import('pages/dashboard/admin/poll/UpdatePoll')));

// ==============================|| MAIN ROUTING ||============================== //

const PollRoutes = {
  path: '',
  element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
  children: [
    {
      path: URLS.LIST_POLL_PAGE,
      element: <ListPollPage />,
    },
    {
      path: URLS.CREATE_POLL_PAGE,
      element: <CreatePollPage />
    },
    {
      path: URLS.UPDATE_POLL_PAGE,
      element: <UpdatePollPage />
    },
  ]
};

export default PollRoutes;
