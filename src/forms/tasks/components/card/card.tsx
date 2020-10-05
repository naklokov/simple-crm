import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Popconfirm, Skeleton, Typography } from "antd";
import {
  defaultErrorHandler,
  getDateWithTimezone,
  getFullUrl,
} from "../../../../utils";
import {
  DATE_FORMATS,
  TASK_TYPES_MAP,
  TaskTypeType,
  urls,
  ClientEntityProps,
} from "../../../../constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "query-string";

interface CardProps {
  id: string;
  clientId: string;
  title?: string;
  taskType: TaskTypeType;
  taskDescription?: string;
  format?: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  date?: string;
}

export const Card = ({
  id,
  clientId,
  date,
  taskType,
  taskDescription,
  onDelete,
  onComplete,
  format = DATE_FORMATS.TIME,
  title = "",
}: CardProps) => {
  const [t] = useTranslation("card");
  const [client, setClient] = useState({} as ClientEntityProps);
  const [loading, setLoading] = useState(false);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        getFullUrl(urls.clients.entity, clientId)
      );
      setClient(response?.data ?? {});
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const extra = date ? (
    <div>
      <ClockCircleTwoTone />
      <span style={{ marginLeft: "4px" }}>
        {getDateWithTimezone(date).format(format)}
      </span>
    </div>
  ) : null;

  const handleComplete = useCallback(() => {
    onComplete(id);
  }, [onComplete]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete]);

  const actions = [
    <span onClick={handleComplete}>{t("action.complete")}</span>,
    <Popconfirm
      title={t("delete.confirm")}
      onConfirm={handleDelete}
      placement="topLeft"
    >
      <span>{t("action.delete")}</span>
    </Popconfirm>,
  ];

  const titleContent = (
    <Link
      to={{
        pathname: getFullUrl(urls.clients.path, clientId),
        search: stringify({ "lower:tab": "tasks" }),
      }}
    >
      {client?.shortName ?? title}
    </Link>
  );

  const titleSkeleton = (
    <Skeleton.Input style={{ width: "200px" }} active={true} size={"small"} />
  );

  const cardTitle = loading ? titleSkeleton : titleContent;

  return (
    <CardUI title={cardTitle} extra={extra} size="small" actions={actions}>
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
