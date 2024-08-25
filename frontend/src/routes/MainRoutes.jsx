import { lazy } from 'react';
import Loadable from 'components/Loadable';
import * as URLS from './urls';

const Home = Loadable(lazy(() => import('pages/home')));
const PollPage = Loadable(lazy(() => import('pages/poll/PollPage')));

const MainRoutes = [
  {
    path: URLS.HOME_PAGE,
    element: <Home />,
  },
  {
    path: URLS.POLL_PAGE,
    element: <PollPage />
  }
];

export default MainRoutes;
