import React from "react";
import { connect } from "react-redux";
import { ErrorAppState, State, http, urls } from "../../constants";
import { hasPermission } from "./utils";
import { Redirect } from "react-router";

interface PageCheckerProps {
  children: JSX.Element;
  availablePermissions?: string[];
  allPermissions: string[];
}

export const PermissionChecker = ({
  allPermissions,
  children,
  availablePermissions = [],
}: PageCheckerProps) => {
  if (!hasPermission(availablePermissions, allPermissions)) {
    const error: ErrorAppState = {
      errorCode: http.HTTP_CODES.FORBIDDEN.toString(),
    };
    return <Redirect to={{ pathname: urls.error.path, state: { error } }} />;
  }

  return children;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions,
});

export default connect(mapStateToProps)(PermissionChecker);
