import React from "react";
import { Tooltip } from "antd";

import { noop } from "lodash";
import style from "./button-layout.module.scss";
import { TOOLTIP_SHOW_DELAY } from "../../constants";

interface IconLayoutProps {
  children: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

const ButtonLayout: React.FC<IconLayoutProps> = ({
  children,
  tooltip,
  onClick = noop,
}) => (
  // eslint-disable-next-line
  <div className={style.container} onClick={onClick}>
    <Tooltip mouseEnterDelay={TOOLTIP_SHOW_DELAY} title={tooltip}>
      {children}
    </Tooltip>
  </div>
);

export default ButtonLayout;
