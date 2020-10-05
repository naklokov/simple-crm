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
  ErrorScreen,
  NotFoundScreen,
  Tasks,
} from "../../forms";

import { ProtectedRoute } from ".";
import { urls } from "../../constants";
import { AuthorizedLayout, UnauthorizedLayout } from "../../layouts";
import { ROOT_URL } from "../../constants/http";

const {
  main,
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
      <ProtectedRoute
        path={[
          main.path,
          clients.path,
          profile.path,
          clientCard.path,
          tasks.path,
        ]}
        component={AuthorizedLayout}
      >
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

          <Redirect from={main.path} to={{ pathname: clients.path }} exact />
        </Switch>
      </ProtectedRoute>

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
      <Route
        key={urls.error.path}
        path={urls.error.path}
        component={ErrorScreen}
      />
      <Redirect from="/" to={{ pathname: urls.main.path }} exact />
      <Redirect from="/crm" to={{ pathname: urls.main.path }} exact />
      <Route path="*">
        <NotFoundScreen />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
