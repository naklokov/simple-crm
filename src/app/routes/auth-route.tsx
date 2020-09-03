import React from "react";

import { Redirect, Route, RouteProps } from "react-router";
import { urls } from "../../constants";
import { AuthorizedLayout } from "../../layouts";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";
import { PagePermissionsChecker } from "../../wrappers";

interface AuthorizeRouteProps extends RouteProps {
  auth: boolean;
  permissions?: string[];
  subheader?: JSX.Element;
  children: JSX.Element;
}

export const AuthorizeRoute = ({
  auth,
  exact = false,
  permissions,
  subheader,
  children,
  ...rest
}: AuthorizeRouteProps) => {
  return (
    <Route
      {...rest}
      exact={exact}
      render={({ location }) =>
        auth ? (
          <PagePermissionsChecker availablePermissions={permissions}>
            <AuthorizedLayout subheader={subheader}>
              {children}
            </AuthorizedLayout>
          </PagePermissionsChecker>
        ) : (
          <Redirect
            to={{
              pathname: urls.login.path,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  auth: state?.persist?.auth ?? false,
});

export default connect(mapStateToProps)(AuthorizeRoute);
