import React from "react";
import cn from "classnames";

import { Typography } from "antd";
import { LOGO, TITLE } from "../../../../constants/layouts";

import style from "./logo.module.scss";

interface LogoProps {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => (
  <div className={style.logo}>
    <img className={style.img} alt="logo" src={LOGO} />
    <Typography.Text
      strong
      className={cn(style.title, { [style.collapsed]: collapsed })}
    >
      {TITLE.toUpperCase()}
    </Typography.Text>
  </div>
);

export default Logo;
