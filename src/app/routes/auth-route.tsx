import React from "react";

import { Redirect, Route } from "react-router";
import { urls } from "../../constants";
import { AuthorizedLayout } from "../../layouts";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";

interface AuthorizeRouteProps {
  auth: boolean;
  path: string;
  children: JSX.Element;
}

export const AuthorizeRoute = ({
  auth,
  children,
  ...rest
}: AuthorizeRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          <AuthorizedLayout>{children}</AuthorizedLayout>
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
