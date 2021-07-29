import { Typography } from "antd";
import React from "react";
import style from "./column.module.scss";
import { TitleTypeType } from "../../constants";

export interface TitleProps {
  titleType?: TitleTypeType;
  title: string;
}

export const Title: React.FC<TitleProps> = React.memo(
  ({ titleType, title }) => (
    <Typography.Title type={titleType} level={5} className={style.title}>
      {title}
    </Typography.Title>
  )
);
