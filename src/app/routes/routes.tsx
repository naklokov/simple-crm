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
} from "../../forms";
import { AuthorizeRoute, UnauthorizeRoute } from ".";

import { concatErrorPath } from "../../utils";
import { urls, http } from "../../constants";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FORM_NAME as loginFormName } from "../../forms/login/constants";
import { FORM_NAME as forgotPasswordFormName } from "../../forms/forgot-password/constants";
import { FORM_NAME as restorePasswordFormName } from "../../forms/restore-password/constants";
import { NotFound } from "../../forms/errors/not-found";

const {
  HTTP_CODES: { NOT_FOUND },
} = http;

const Routes = () => {
  const [t] = useTranslation();
  return (
    <Router basename={http.ROOT_URL}>
      <Switch>
        <AuthorizeRoute path={urls.profile.path}>
          <Profile />
        </AuthorizeRoute>
        <AuthorizeRoute path={urls.clients.path}>
          <Clients />
        </AuthorizeRoute>
        <AuthorizeRoute path={urls.tasks.path}>
          <Typography.Title>Планы</Typography.Title>
        </AuthorizeRoute>
        <AuthorizeRoute path={urls.deals.path}>
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

        <Route path={}>
          <Error />
        </Route>
        <Route path={}>
          <Error />
        </Route>
        <Redirect
          from={http.ROOT_URL}
          to={{ pathname: urls.clients.path }}
          exact
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
