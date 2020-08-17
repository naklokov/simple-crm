import React from "react";

import { Redirect, Route } from "react-router";
import { urls } from "../../constants";
import { AuthorizedLayout } from "../../layouts";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";
import { PagePermissionsChecker } from "../../wrappers";

interface AuthorizeRouteProps {
  auth: boolean;
  permissions?: string[];
  path: string;
  subheader?: JSX.Element;
  children: JSX.Element;
}

export const AuthorizeRoute = ({
  auth,
  permissions,
  subheader,
  children,
  ...rest
}: AuthorizeRouteProps) => {
  return (
    <Route
      {...rest}
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
