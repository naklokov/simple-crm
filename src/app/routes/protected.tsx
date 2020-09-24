import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { urls } from "../../constants";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";

interface ProtectedRouteProps extends RouteProps {
  auth: boolean;
  component: any;
}

export const ProtectedRoute = ({
  auth,
  component: Component,
  ...rest
}: ProtectedRouteProps) => (
  <Route
    {...rest}
    render={({ location, ...props }) =>
      auth ? (
        <Component {...props} />
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

const mapStateToProps = (state: State) => ({
  auth: state?.persist?.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
