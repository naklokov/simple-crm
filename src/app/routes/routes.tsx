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
