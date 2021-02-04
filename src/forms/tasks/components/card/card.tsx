import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Popconfirm, Skeleton, Typography } from "antd";
import {
  defaultErrorHandler,
  getDateWithTimezone,
  getFullUrl,
} from "../../../../utils";
import {
  TASK_TYPES_MAP,
  urls,
  ClientEntityProps,
  TaskEntityProps,
  DATE_FORMATS,
} from "../../../../constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "query-string";
import { ClientsPersonalContext } from "../../../../components/table/utils";

const { Paragraph, Text } = Typography;

interface CardProps {
  title?: string;
  task: TaskEntityProps;
  onComplete: (task: TaskEntityProps) => void;
  onDelete: (task: TaskEntityProps) => void;
  dateFormat?: string;
}

export const Card = ({
  task,
  dateFormat = DATE_FORMATS.TIME,
  onDelete,
  onComplete,
  title = "",
}: CardProps) => {
  const [t] = useTranslation("card");
  const [client, setClient] = useState({} as ClientEntityProps);
  const [loading, setLoading] = useState(false);
  const cachingClients = useContext(ClientsPersonalContext);

  const {
    clientId,
    taskEndDate: date,
    taskDescription: description,
    taskType: type,
  } = task;

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
    const cachingClient = cachingClients.find(({ id }) => id === clientId);
    if (cachingClient) {
      setClient(cachingClient);
    } else {
      fetchClient();
    }
  }, []);

  const extra = date ? (
    <div>
      <ClockCircleTwoTone />
      <Text strong style={{ marginLeft: "4px" }}>
        {getDateWithTimezone(date).format(dateFormat)}
      </Text>
    </div>
  ) : null;

  const handleComplete = useCallback(() => {
    onComplete(task);
  }, [onComplete]);

  const handleDelete = useCallback(() => {
    onDelete(task);
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
    <CardUI
      style={{ width: "100%" }}
      title={cardTitle}
      extra={extra}
      size="small"
      actions={actions}
    >
      <strong>{TASK_TYPES_MAP[type]}</strong>
      {description && (
        <Paragraph ellipsis={{ rows: 2, expandable: true }}>
          {description}
        </Paragraph>
      )}
    </CardUI>
  );
};

export default Card;
