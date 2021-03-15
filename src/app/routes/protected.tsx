import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { urls, State } from "../../constants";

interface ProtectedRouteProps extends RouteProps {
  auth: boolean;
  children?: ReactNode;
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  auth,
  children,
  component: Component,
  ...rest
}) => (
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
