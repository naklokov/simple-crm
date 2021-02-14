import { Typography } from "antd";
import React from "react";
import { DATE_FORMATS } from "../../../../constants";
import { getDateWithTimezone } from "../../../common";

interface ActiveContentProps {
  date: string;
  description?: string;
}

export const ActiveContent = ({ date, description }: ActiveContentProps) => (
  <>
    <Typography.Text strong style={{ display: "block" }}>
      {getDateWithTimezone(date).format(DATE_FORMATS.TIME)}
    </Typography.Text>
    {description && <Typography.Text>{description}</Typography.Text>}
  </>
);

export default ActiveContent;
