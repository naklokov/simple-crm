import React from "react";

import { Redirect, Route } from "react-router";
import { urls } from "../../constants";
import { connect } from "react-redux";

interface PrivateRouteProps {
  auth: boolean;
  path: string;
  children: JSX.Element;
}

export const PrivateRoute = ({
  children,
  auth,
  ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    render={({ location }) =>
      auth ? (
        children
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

interface State {
  common: {
    auth: boolean;
  };
}

const mapStateToProps = (state: State) => ({
  auth: state?.common?.auth ?? false,
});

export default connect(mapStateToProps)(PrivateRoute);
