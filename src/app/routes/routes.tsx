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
  ClientsHeader,
  ClientCard,
  ClientCardHeader,
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
          key={urls.profile.path}
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
          key={urls.clientCard.path}
          subheader={<ClientCardHeader />}
          path={urls.clientCard.path}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
          exact
        >
          <ClientCard />
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.clients.path}
          subheader={<ClientsHeader />}
          path={urls.clients.path}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
        >
          <Clients />
        </AuthorizeRoute>

        <AuthorizeRoute
          key={urls.tasks.path}
          path={urls.tasks.path}
          permissions={[TASKS.ADMIN, TASKS.GET, TASKS.GET_OWNER]}
        >
          <Typography.Title>Задачи</Typography.Title>
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.deals.path}
          path={urls.deals.path}
          permissions={[DEALS.ADMIN, DEALS.GET, DEALS.GET_OWNER]}
        >
          <Typography.Title>Сделки</Typography.Title>
        </AuthorizeRoute>
        <AuthorizeRoute key={urls.knowledge.path} path={urls.knowledge.path}>
          <Typography.Title>База знаний</Typography.Title>
        </AuthorizeRoute>

        <UnauthorizeRoute
          key={urls.login.path}
          path={urls.login.path}
          title={t("title", { ns: loginFormName })}
        >
          <Login />
        </UnauthorizeRoute>
        <UnauthorizeRoute
          key={urls.forgotPassword.path}
          path={urls.forgotPassword.path}
          title={t("title", { ns: forgotPasswordFormName })}
          description={t("description", { ns: forgotPasswordFormName })}
        >
          <ForgotPassword />
        </UnauthorizeRoute>
        <UnauthorizeRoute
          key={urls.restorePassword.path}
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
