import React from "react";

import { Redirect, Route } from "react-router";
import { urls } from "../../constants";
import { hasAuthCookie } from "../../utils";
import { AuthorizedLayout } from "../../layouts";

interface AuthorizeRouteProps {
  path: string;
  children: JSX.Element;
}

export const AuthorizeRoute = ({ children, ...rest }: AuthorizeRouteProps) => {
  const isAuth = hasAuthCookie();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
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

export default AuthorizeRoute;
