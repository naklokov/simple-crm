import React from "react";
import { connect } from "react-redux";
import { ErrorAppState, State } from "../../__data__/interfaces";
import { hasPermission } from "./utils";
import { Redirect } from "react-router";
import { urls } from "../../constants";
import { HTTP_CODES } from "../../constants/http";

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
      errorCode: HTTP_CODES.FORBIDDEN.toString(),
    };
    return <Redirect to={{ pathname: urls.error.path, state: { error } }} />;
  }

  return children;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions ?? [],
});

export default connect(mapStateToProps)(PermissionChecker);
