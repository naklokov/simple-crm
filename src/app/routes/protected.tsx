import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { urls, State } from "../../constants";
import { connect } from "react-redux";

interface ProtectedRouteProps extends RouteProps {
  auth: boolean;
  children?: ReactNode;
  component: any;
}

export const ProtectedRoute = ({
  auth,
  children,
  component: Component,
  ...rest
}: ProtectedRouteProps) => (
  <Route
    {...rest}
    render={({ location, ...props }) =>
      auth ? (
        <Component {...props}>{children}</Component>
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
