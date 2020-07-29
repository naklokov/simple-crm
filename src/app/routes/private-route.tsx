import React from "react";

import { Redirect, Route } from "react-router";
import { urls } from "../../constants";
import { hasAuthCookie } from "../../utils";

interface PrivateRouteProps {
  path: string;
  children: JSX.Element;
}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const isAuth = hasAuthCookie();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
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
};

export default PrivateRoute;
