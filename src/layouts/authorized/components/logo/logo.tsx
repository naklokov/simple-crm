import React from "react";
import cn from "classnames";

import { Typography } from "antd";
import { LOGO } from "../../../../constants/layouts";

import style from "./logo.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LogoProps {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => {
  const [t] = useTranslation("authorizedLayout");
  return (
    <Link to="/">
      <div className={style.logo}>
        <img className={style.img} alt="logo" src={LOGO} />
        <Typography.Text
          strong
          className={cn(style.title, { [style.collapsed]: collapsed })}
        >
          {t("title").toUpperCase()}
        </Typography.Text>
      </div>
    </Link>
  );
};

export default Logo;
