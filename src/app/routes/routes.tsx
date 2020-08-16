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
  RestorePassword,
  Profile,
  NotFoundError,
} from "../../forms";
import { AuthorizeRoute, UnauthorizeRoute } from ".";

import { urls, http, PERMISSIONS } from "../../constants";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FORM_NAME as loginFormName } from "../../forms/login/constants";
import { FORM_NAME as forgotPasswordFormName } from "../../forms/forgot-password/constants";
import { FORM_NAME as restorePasswordFormName } from "../../forms/restore-password/constants";

const MAIN_PAGE = urls.clients.path;
const { PROFILE_INFO, CLIENTS, TASKS, DEALS } = PERMISSIONS;

const Routes = () => {
  const [t] = useTranslation();
  return (
    <Router basename={http.ROOT_URL}>
      <Switch>
        <AuthorizeRoute
          path={urls.profile.path}
          permissions={[
            PROFILE_INFO.ADMIN,
            PROFILE_INFO.GET,
            PROFILE_INFO.GET_OWNER,
          ]}
        >
          <Profile />
        </AuthorizeRoute>
        <AuthorizeRoute
          path={urls.clients.path}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
        >
          <Clients />
        </AuthorizeRoute>
        <AuthorizeRoute
          path={urls.tasks.path}
          permissions={[TASKS.ADMIN, TASKS.GET, TASKS.GET_OWNER]}
        >
          <Typography.Title>Планы</Typography.Title>
        </AuthorizeRoute>
        <AuthorizeRoute
          path={urls.deals.path}
          permissions={[DEALS.ADMIN, DEALS.GET, DEALS.GET_OWNER]}
        >
          <Typography.Title>Сделки</Typography.Title>
        </AuthorizeRoute>
        <AuthorizeRoute path={urls.knowledge.path}>
          <Typography.Title>База знаний</Typography.Title>
        </AuthorizeRoute>

        <UnauthorizeRoute
          path={urls.login.path}
          title={t("title", { ns: loginFormName })}
        >
          <Login />
        </UnauthorizeRoute>
        <UnauthorizeRoute
          path={urls.forgotPassword.path}
          title={t("title", { ns: forgotPasswordFormName })}
          description={t("description", { ns: forgotPasswordFormName })}
        >
          <ForgotPassword />
        </UnauthorizeRoute>
        <UnauthorizeRoute
          path={urls.restorePassword.path}
          title={t("title", { ns: restorePasswordFormName })}
          description={t("description", { ns: restorePasswordFormName })}
        >
          <RestorePassword />
        </UnauthorizeRoute>
        <Redirect from="/" to={{ pathname: MAIN_PAGE }} exact />
        <Redirect from="/crm" to={{ pathname: MAIN_PAGE }} exact />
        <Route path="*">
          <NotFoundError />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
