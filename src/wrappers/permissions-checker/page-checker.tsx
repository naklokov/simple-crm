import React from "react";
import { ForbiddenError } from "../../forms";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { hasPermission } from "./utils";

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
    return <ForbiddenError />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions ?? [],
});

export default connect(mapStateToProps)(PermissionChecker);
