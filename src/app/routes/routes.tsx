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

const {
  HTTP_CODES: { NOT_FOUND },
} = http;

const Routes = () => (
  <Router>
    <Switch>
      <Route path={concatErrorPath()}>
        <Error />
      </Route>
      <PrivateRoute path={urls.clients.path}>
        <Clients />
      </PrivateRoute>
      <PrivateRoute path={urls.tasks.path}>
        <AuthorizedLayout>
          <Typography.Title>Планы</Typography.Title>
        </AuthorizedLayout>
      </PrivateRoute>
      <PrivateRoute path={urls.deals.path}>
        <AuthorizedLayout>
          <Typography.Title>Сделки</Typography.Title>
        </AuthorizedLayout>
      </PrivateRoute>
      <PrivateRoute path={urls.knowledge.path}>
        <AuthorizedLayout>
          <Typography.Title>База знаний</Typography.Title>
        </AuthorizedLayout>
      </PrivateRoute>
      <Route path={urls.login.path}>
        <Login />
      </Route>
      <Route path={urls.forgotPassword.path}>
        <ForgotPassword />
      </Route>
      <Route path={urls.restorePassword.path}>
        <RestorePassword />
      </Route>
      <Redirect from="/" to={{ pathname: urls.clients.path }} exact />
      <Redirect from="*" to={{ pathname: concatErrorPath(NOT_FOUND) }} />
    </Switch>
  </Router>
);

export default Routes;
