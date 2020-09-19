import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Login,
  ForgotPassword,
  Clients,
  ClientCard,
  RestorePassword,
  Profile,
  NotFoundError,
  Tasks,
} from "../../forms";

import { ProtectedRoute } from ".";
import { urls } from "../../constants";
import { useTranslation } from "react-i18next";
import { FORM_NAME as loginFormName } from "../../forms/login/constants";
import { FORM_NAME as forgotPasswordFormName } from "../../forms/forgot-password/constants";
import { FORM_NAME as restorePasswordFormName } from "../../forms/restore-password/constants";
import { AuthorizedLayout, UnauthorizedLayout } from "../../layouts";
import { ROOT_URL } from "../../constants/http";

const MAIN_PAGE = urls.clients.path;

const {
  clientCard,
  clients,
  profile,
  tasks,
  login,
  restorePassword,
  forgotPassword,
} = urls;

const Routes = () => (
  <Router basename={ROOT_URL}>
    <Switch>
      <Route path={[clients.path, clientCard.path, profile.path, tasks.path]}>
        <AuthorizedLayout>
          <Switch>
            <ProtectedRoute
              key={profile.path}
              path={profile.path}
              component={Profile}
            />
            <ProtectedRoute
              exact
              key={clients.path}
              path={clients.path}
              component={Clients}
            />
            <ProtectedRoute
              key={clientCard.path}
              path={clientCard.path}
              component={ClientCard}
            />
            <ProtectedRoute
              key={tasks.path}
              path={tasks.path}
              component={Tasks}
            />
          </Switch>
        </AuthorizedLayout>
      </Route>

      <Route path={[login.path, forgotPassword.path, restorePassword.path]}>
        <UnauthorizedLayout>
          <Switch>
            <Route key={login.path} path={login.path} component={Login} />
            <Route
              key={forgotPassword.path}
              path={forgotPassword.path}
              component={ForgotPassword}
            />
            <Route
              key={restorePassword.path}
              path={restorePassword.path}
              component={RestorePassword}
            />
          </Switch>
        </UnauthorizedLayout>
      </Route>
      <Redirect from="/" to={{ pathname: MAIN_PAGE }} exact />
      <Redirect from="/crm" to={{ pathname: MAIN_PAGE }} exact />
      <Route path="*">
        <NotFoundError />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
