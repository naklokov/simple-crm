import React from "react";

import style from "./unauthorized.module.scss";
import { logo } from "../../assets/img";
import { Typography } from "antd";

interface LoginProps {
  title?: string;
  description?: string;
  children: JSX.Element;
}

export const Unauthorized = ({ title, description, children }: LoginProps) => (
  <form className={style.form}>
    <div className={style.container}>
      <div className={style.layout}>
        <div className={style.imgContainer}>
          <img className={style.img} alt="logo" src={logo} />
        </div>
        {title && (
          <Typography.Title className={style.title} level={2}>
            {title}
          </Typography.Title>
        )}
        {description && (
          <Typography.Title
            className={style.description}
            level={4}
            type="secondary"
          >
            {description}
          </Typography.Title>
        )}
      </div>
      {children}
    </div>
  </form>
);

export default Unauthorized;
