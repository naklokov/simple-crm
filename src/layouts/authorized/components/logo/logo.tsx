import React from "react";
import cn from "classnames";

import { Typography } from "antd";
import { LOGO, TITLE } from "../../../../constants/layouts";

import style from "./logo.module.scss";
import { Link } from "react-router-dom";

interface LogoProps {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => (
  <Link to="/">
    <div className={style.logo}>
      <img className={style.img} alt="logo" src={LOGO} />
      <Typography.Text
        strong
        className={cn(style.title, { [style.collapsed]: collapsed })}
      >
        {TITLE.toUpperCase()}
      </Typography.Text>
    </div>
  </Link>
);

export default Logo;
