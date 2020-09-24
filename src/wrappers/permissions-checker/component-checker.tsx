import React, { ReactElement, useState, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { hasPermission } from "./utils";

interface ComponentCheckerProps {
  children: JSX.Element;
  availablePermissions: string[];
  allPermissions: string[];
  mode?: "hide" | "disabled";
  isOwner?: boolean;
}

export const ComponentChecker = ({
  mode = "hide",
  allPermissions,
  children,
  availablePermissions = [],
  isOwner = true,
}: ComponentCheckerProps) => {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const isAllow = hasPermission(availablePermissions, allPermissions);
    setAllowed(isAllow);
  }, [availablePermissions, allPermissions]);

  if (!allowed || !isOwner) {
    if (mode === "hide") {
      return null;
    }

    if (mode === "disabled") {
      return (
        <React.Fragment>
          {React.cloneElement(children, {
            disabled: true,
            rules: [],
          })}
        </React.Fragment>
      );
    }
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions,
});

export default connect(mapStateToProps)(ComponentChecker);
