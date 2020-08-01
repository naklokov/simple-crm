import React from "react";

import style from "./main.module.scss";
import { Typography } from "antd";

export const Main = () => (
  <div className={style.container}>
    <Typography.Title>Инфо о профиле</Typography.Title>
  </div>
);

export default Main;
