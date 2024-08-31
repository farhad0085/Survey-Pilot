import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { IsLoggedIn } from './RouteTypes';
import * as URLS from './urls';
import DashboardLayout from 'layout/Dashboard';

const ListSurveyPage = Loadable(lazy(() => import('pages/dashboard/admin/survey/ListSurvey')));
const CreateSurveyPage = Loadable(lazy(() => import('pages/dashboard/admin/survey/CreateSurvey')));
const UpdateSurveyPage = Loadable(lazy(() => import('pages/dashboard/admin/survey/UpdateSurvey')));


const SurveyRoutes = [
  {
    path: '',
    element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
    children: [
      {
        path: URLS.LIST_SURVEY_PAGE,
        element: <ListSurveyPage />,
      },
      {
        path: URLS.CREATE_SURVEY_PAGE,
        element: <CreateSurveyPage />
      },
      {
        path: URLS.UPDATE_SURVEY_PAGE,
        element: <UpdateSurveyPage />
      },
    ]
  }
];

export default SurveyRoutes;
