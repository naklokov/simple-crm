import React from "react";

import { isAuth } from "../utils";
import { Redirect, Route } from "react-router";
import { urls } from "../constants";

interface PrivateRouteProps {
  path: string;
  children: JSX.Element;
}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuth() ? (
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

export default PrivateRoute;
