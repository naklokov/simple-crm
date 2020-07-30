import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Error,
  Login,
  ForgotPassword,
  Clients,
  RestorePassword,
} from "../../forms";
import PrivateRoute from "./private-route";

import { concatErrorPath } from "../../utils";
import { urls, http } from "../../constants";
import { Typography } from "antd";
import { AuthorizedLayout } from "../../layouts";
import { Profile } from "../../layouts/authorized/components";

const {
  HTTP_CODES: { NOT_FOUND },
} = http;

const Routes = () => (
  <Router>
    <Switch>
      <AuthorizedLayout>
        <Switch>
          <PrivateRoute path={urls.clients.path}>
            <Profile />
          </PrivateRoute>
          <PrivateRoute path={urls.clients.path}>
            <Clients />
          </PrivateRoute>
          <PrivateRoute path={urls.tasks.path}>
            <Typography.Title>Планы</Typography.Title>
          </PrivateRoute>
          <PrivateRoute path={urls.deals.path}>
            <Typography.Title>Сделки</Typography.Title>
          </PrivateRoute>
          <PrivateRoute path={urls.knowledge.path}>
            <Typography.Title>База знаний</Typography.Title>
          </PrivateRoute>
        </Switch>
      </AuthorizedLayout>
      <Route path={urls.login.path}>
        <Login />
      </Route>
      <Route path={urls.forgotPassword.path}>
        <ForgotPassword />
      </Route>
      <Route path={urls.restorePassword.path}>
        <RestorePassword />
      </Route>
      <Route path={concatErrorPath()}>
        <Error />
      </Route>
      <Redirect from="/" to={{ pathname: urls.clients.path }} exact />
      <Redirect from="*" to={{ pathname: concatErrorPath(NOT_FOUND) }} />
    </Switch>
  </Router>
);

export default Routes;
