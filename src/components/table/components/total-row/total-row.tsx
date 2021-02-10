import React from "react";
import { Typography } from "antd";
import { fillTemplate } from "../../../../utils";

import style from "./total-row.module.scss";

interface TotalRowProps {
  title: string;
  count?: number;
}

const { Text } = Typography;

export const TotalRow = ({ title, count = 0 }: TotalRowProps) => (
  <Text className={style.total} strong>
    {`${title} - ${count}`}
  </Text>
);
