import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Home = Loadable(lazy(() => import('pages/home')));


const MainRoutes = {
  path: '/',
  element: <Home />,
};

export default MainRoutes;
