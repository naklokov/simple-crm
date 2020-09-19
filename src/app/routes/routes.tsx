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
import { AuthorizeRoute, UnauthorizeRoute } from ".";

import { urls, http, PERMISSIONS, RsqlParamProps } from "../../constants";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FORM_NAME as loginFormName } from "../../forms/login/constants";
import { FORM_NAME as forgotPasswordFormName } from "../../forms/forgot-password/constants";
import { FORM_NAME as restorePasswordFormName } from "../../forms/restore-password/constants";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { connect } from "react-redux";

const MAIN_PAGE = urls.clients.path;
const { PROFILE_INFO, CLIENTS, TASKS } = PERMISSIONS;

interface RoutesProps {
  profileInfo: ProfileInfoProps;
}

const Routes = ({ profileInfo }: RoutesProps) => {
  const [t] = useTranslation();

  const userProfileRsql: RsqlParamProps[] = [
    {
      key: "userProfileId",
      value: profileInfo?.id ?? "",
    },
  ];

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
          path={urls.clientCard.path}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
          exact
        >
          <ClientCard />
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.clients.path}
          path={urls.clients.path}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
          exact
        >
          <Clients />
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.clients.pathMy}
          path={urls.clients.pathMy}
          permissions={[CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER]}
        >
          <Clients
            title={t("title.my", { ns: "clients" })}
            fetchParams={{ rsql: userProfileRsql }}
          />
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.tasks.path}
          path={urls.tasks.path}
          permissions={[TASKS.ADMIN, TASKS.GET, TASKS.GET_OWNER]}
        >
          <Tasks />
        </AuthorizeRoute>
        <AuthorizeRoute
          key={urls.deals.path}
          path={urls.deals.path}
          permissions={[]}
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

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

export default connect(mapStateToProps)(Routes);
