import React from "react";
import moment from "moment";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Typography } from "antd";
import { getDateWithTimezone, getFullUrl } from "../../../../utils";
import {
  DATE_FORMATS,
  TASK_TYPES_MAP,
  TaskTypeType,
  urls,
} from "../../../../constants";

interface CardProps {
  id: string;
  title: string;
  taskType: TaskTypeType;
  taskDescription?: string;
  date?: string;
}

export const Card = ({
  id,
  title,
  date,
  taskType,
  taskDescription,
}: CardProps) => {
  const extra = date ? (
    <div>
      <ClockCircleTwoTone />
      <span style={{ marginLeft: "4px" }}>
        {getDateWithTimezone(date).format(DATE_FORMATS.TIME)}
      </span>
    </div>
  ) : null;

  const titleContent = <a href={getFullUrl(urls.clients.path, id)}>{title}</a>;

  return (
    <CardUI title={titleContent} extra={extra} size="small">
      <strong>{TASK_TYPES_MAP[taskType]}</strong>
      {taskDescription && (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
          {taskDescription}
        </Typography.Paragraph>
      )}
    </CardUI>
  );
};

export default Card;
