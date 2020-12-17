import React from "react";
import { Typography } from "antd";

import style from "./total-row.module.scss";

interface TotalRowProps {
  title?: string;
  count?: number;
}

export const TotalRow = ({ title, count = 0 }: TotalRowProps) => (
  <div className={style.total}>
    <Typography.Title
      level={5}
      className={style.title}
    >{`${title}:`}</Typography.Title>
    <Typography.Title level={5} className={style.count}>
      {count}
    </Typography.Title>
  </div>
);
