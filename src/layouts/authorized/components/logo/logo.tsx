import React from "react";

import { Typography } from "antd";
import { LOGO, TITLE } from "../../../../constants/layouts";

import style from "./logo.module.scss";

interface LogoProps {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => (
  <div className={style.logo}>
    <img className={style.img} alt="logo" src={LOGO} />
    {!collapsed && (
      <Typography.Text className={style.title}>
        {TITLE.toUpperCase()}
      </Typography.Text>
    )}
  </div>
);

export default Logo;
