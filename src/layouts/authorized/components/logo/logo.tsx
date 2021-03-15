import React from "react";

import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LOGO } from "../../../../constants/layouts";

import style from "./logo.module.scss";
import { urls } from "../../../../constants";

interface LogoProps {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: LogoProps) => {
  const [t] = useTranslation("authorizedLayout");
  return (
    <Link to={urls.main.path}>
      <div className={style.logo}>
        <img className={style.img} alt="logo" src={LOGO} />
        {!collapsed && (
          <Typography.Text strong className={style.title}>
            {t("title").toUpperCase()}
          </Typography.Text>
        )}
      </div>
    </Link>
  );
};

export default Logo;
