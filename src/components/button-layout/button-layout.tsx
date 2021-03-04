import React from "react";
import { Tooltip } from "antd";

import style from "./button-layout.module.scss";
import { noop } from "lodash";
import { TOOLTIP_SHOW_DELAY } from "../../constants";

interface IconLayoutProps {
  children: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

const ButtonLayout = ({
  children,
  tooltip,
  onClick = noop,
}: IconLayoutProps) => (
  <div className={style.container} onClick={onClick}>
    <Tooltip mouseEnterDelay={TOOLTIP_SHOW_DELAY} title={tooltip}>
      {children}
    </Tooltip>
  </div>
);

export default ButtonLayout;
