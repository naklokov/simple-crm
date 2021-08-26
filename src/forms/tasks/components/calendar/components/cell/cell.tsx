import React from "react";
import moment from "moment-timezone";
import { Badge, Typography } from "antd";

interface CellProps {
  date: moment.Moment;
  color?: string;
  count?: number;
}

export const Cell: React.FC<CellProps> = ({
  date,
  color = "black",
  count = 0,
}) => {
  const day = date.date();

  return (
    <Badge
      className="ant-picker-cell-inner ant-picker-calendar-date"
      size="small"
      count={count}
      style={{ zIndex: 2 }}
    >
      <Typography.Text>{day}</Typography.Text>
    </Badge>
  );
};

export default Cell;
