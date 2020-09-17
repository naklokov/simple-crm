import React, { useEffect, useState } from "react";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Skeleton, Space, Typography } from "antd";
import { getDateWithTimezone, getFullUrl, useFetch } from "../../../../utils";
import {
  DATE_FORMATS,
  TASK_TYPES_MAP,
  TaskTypeType,
  urls,
  ClientEntityProps,
} from "../../../../constants";
import { useTranslation } from "react-i18next";

interface CardProps {
  clientId: string;
  title?: string;
  taskType: TaskTypeType;
  taskDescription?: string;
  date?: string;
}

export const Card = ({
  clientId,
  date,
  taskType,
  taskDescription,
  title = "",
}: CardProps) => {
  const [client, setClient] = useState({} as ClientEntityProps);
  const { response, loading } = useFetch({
    url: getFullUrl(urls.clients.entity, clientId),
  });

  useEffect(() => {
    const client = response?.data ?? {};
    setClient(client);
  }, [response]);

  const extra = date ? (
    <div>
      <ClockCircleTwoTone />
      <span style={{ marginLeft: "4px" }}>
        {getDateWithTimezone(date).format(DATE_FORMATS.TIME)}
      </span>
    </div>
  ) : null;

  const titleContent = (
    <a href={getFullUrl(urls.clients.path, clientId)}>
      {client?.shortName ?? title}
    </a>
  );

  const titleSkeleton = (
    <Skeleton.Input style={{ width: "200px" }} active={true} size={"small"} />
  );

  return (
    <CardUI
      title={loading ? titleSkeleton : titleContent}
      extra={extra}
      size="small"
    >
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
