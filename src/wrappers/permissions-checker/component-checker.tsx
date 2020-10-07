import { Tooltip } from "antd";
import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { checkOwner, checkAllow } from "./utils";

interface ComponentCheckerProps {
  children: JSX.Element;
  availablePermissions: string[];
  allPermissions: string[];
  mode?: "hide" | "readonly";
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
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const isAllow = checkAllow(availablePermissions, allPermissions);
    setAllowed(isAllow);

    const owner = checkOwner(availablePermissions, allPermissions, isOwner);
    setOwner(owner);
  }, [availablePermissions, allPermissions]);

  if (allowed || owner) {
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
