import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State, EntityOwnerProps } from "../../constants";
import { hasPermission } from "./utils";

interface ComponentCheckerProps {
  mode?: "hide" | "readonly";
  children: JSX.Element;
  availablePermissions: string[];
  allPermissions: string[];
  hasRight?: boolean;
  entity?: EntityOwnerProps;
  field?: string;
}

export const ComponentChecker = ({
  mode = "hide",
  allPermissions,
  children,
  availablePermissions = [],
  hasRight = true,
}: ComponentCheckerProps) => {
  const available = hasPermission(availablePermissions, allPermissions);

  if (available || hasRight) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (mode === "readonly") {
    return (
      <React.Fragment>
        {React.cloneElement(children, {
          readonly: true,
          rules: [],
          placeholder: "",
          style: { pointerEvents: "none" },
        })}
      </React.Fragment>
    );
  }

  return null;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions,
});

export default connect(mapStateToProps)(ComponentChecker);
