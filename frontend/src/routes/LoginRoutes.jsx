import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { IsGuest } from './RouteTypes';
import { LOGIN_PAGE, REGISTER_PAGE } from './urls';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));


const LoginRoutes = [
  {
    path: LOGIN_PAGE,
    element: <IsGuest><AuthLogin /></IsGuest>
  },
  {
    path: REGISTER_PAGE,
    element: <IsGuest><AuthRegister /></IsGuest>
  }
]

export default LoginRoutes;
