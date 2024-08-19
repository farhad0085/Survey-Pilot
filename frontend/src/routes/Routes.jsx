import React from "react";
import { Route, Switch } from "react-router-dom";
import * as URLS from "./urls";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

// pages
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';
import RegisterPage from '../pages/Auth/Register';
import DashboardPage from "../pages/Dashboard/Dashboard";
import ListPollPage from "../pages/Dashboard/Admin/Poll/ListPoll";
import CreatePollPage from "../pages/Dashboard/Admin/Poll/CreatePoll";
import UpdatePollPage from "../pages/Dashboard/Admin/Poll/UpdatePoll";
import PollPage from "../pages/Poll/PollPage";

const Routes = () => {

  return (
    <Switch>
      <Route exact path={URLS.HOME_PAGE} component={Home} />
      <GuestRoute exact path={URLS.LOGIN_PAGE} component={Login} />
      <GuestRoute exact path={URLS.REGISTER_PAGE} component={RegisterPage} />
      <PrivateRoute exact path={URLS.DASHBOARD_PAGE} component={DashboardPage} />
      <PrivateRoute exact path={URLS.LIST_POLL_PAGE} component={ListPollPage} />
      <PrivateRoute exact path={URLS.CREATE_POLL_PAGE} component={CreatePollPage} />
      <PrivateRoute exact path={URLS.UPDATE_POLL_PAGE} component={UpdatePollPage} />
      <Route exact path={URLS.POLL_PAGE} component={PollPage} />
    </Switch>
  );
};

export default Routes;
