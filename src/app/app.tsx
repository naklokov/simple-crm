import React from "react";
import axios from "axios";

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
} from "../forms";
import PrivateRoute from "./private-route";

import { http, urls } from "../constants";
import { concatErrorPath } from "../utils";
import { errorsInterceptor } from "./interceptors";

const {
  HTTP_CODES: { NOT_FOUND },
} = http;

axios.interceptors.response.use((response) => response, errorsInterceptor);

const App = () => (
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
      <Redirect from="/" to={{ pathname: urls.clients.path }} />
      <Redirect from="*" to={{ pathname: concatErrorPath(NOT_FOUND) }} />
    </Switch>
  </Router>
);

export default App;
