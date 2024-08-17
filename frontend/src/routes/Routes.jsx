import React from "react";
import { Route, Switch } from "react-router-dom";
import * as URLS from "./urls";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

// pages
import Login from '../pages/Auth/Login';
import Polls from '../pages/Polls';
import Surveys from '../pages/Surveys';
import Home from '../pages/Home/Home';
import RegisterPage from '../pages/Auth/Register';

const Routes = () => {

  return (
    <Switch>
      <Route exact path={URLS.HOME_PAGE} component={Home} />
      <GuestRoute exact path={URLS.LOGIN_PAGE} component={Login} />
      <GuestRoute exact path={URLS.REGISTER_PAGE} component={RegisterPage} />
      <PrivateRoute path="/polls" component={Polls} />
      <PrivateRoute path="/surveys" component={Surveys} />
    </Switch>
  );
};

export default Routes;
