import React from "react";
import { Route } from "react-router";
import { UnauthorizedLayout } from "../../layouts";

interface UnauthorizeRouteProps {
  title?: string;
  description?: string;
  children: JSX.Element;
  path: string;
}

export const UnauthorizeRoute = ({
  title,
  description,
  children,
  ...rest
}: UnauthorizeRouteProps) => {
  return (
    <Route {...rest}>
      <UnauthorizedLayout title={title} description={description}>
        {children}
      </UnauthorizedLayout>
    </Route>
  );
};

export default UnauthorizeRoute;
