import React, { useMemo } from "react";
import { connect } from "react-redux";
import { State, EntityOwnerProps } from "../../constants";
import { isCanShow } from "./utils";

interface ComponentCheckerProps {
  mode?: "hide" | "readonly";
  children: JSX.Element;
  availablePermissions?: string[];
  allPermissions: string[];
  hasRight?: boolean;
  entity?: EntityOwnerProps;
  field?: string;
}

export const ComponentChecker: React.FC<ComponentCheckerProps> = ({
  mode = "hide",
  allPermissions,
  children,
  availablePermissions = [],
  hasRight = true,
}) => {
  const canShow = useMemo(
    () => isCanShow(availablePermissions, allPermissions, hasRight),
    [availablePermissions, allPermissions, hasRight]
  );

  if (canShow) {
    return <>{children}</>;
  }

  if (mode === "readonly") {
    return (
      <>
        {React.cloneElement(children, {
          readonly: true,
          rules: [],
          placeholder: "",
          style: { pointerEvents: "none" },
        })}
      </>
    );
  }

  return null;
};

const mapStateToProps = (state: State) => ({
  allPermissions: state?.persist?.permissions,
});

export default connect(mapStateToProps)(ComponentChecker);
