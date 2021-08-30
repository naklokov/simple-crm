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
  DepartmentCard,
  Settings,
} from "../../forms";

import { ProtectedRoute } from ".";
import { urls } from "../../constants";
import { AuthorizedLayout, UnauthorizedLayout } from "../../layouts";
import { settings } from "../../constants/urls";

const {
  main,
  clientCard,
  clients,
  profile,
  tasks,
  login,
  restorePassword,
  forgotPassword,
  departmentCard,
} = urls;

const Routes = () => (
  <Router basename="/crm">
    <Switch>
      <ProtectedRoute
        path={[
          settings.path,
          clients.path,
          profile.pathWithId,
          clientCard.path,
          tasks.path,
          departmentCard.path,
        ]}
        component={AuthorizedLayout}
      >
        <Switch>
          <ProtectedRoute
            key={profile.pathWithId}
            path={profile.pathWithId}
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
          <ProtectedRoute
            key={departmentCard.path}
            path={departmentCard.path}
            component={DepartmentCard}
          />
          <ProtectedRoute
            key={settings.path}
            path={settings.path}
            component={Settings}
          />
          <Redirect from={main.path} to={{ pathname: clients.path }} />
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
