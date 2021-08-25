import React, { useCallback, useContext, useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";
import {
  Card as CardUI,
  Popconfirm,
  Skeleton,
  Tooltip,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "query-string";
import { useSelector } from "react-redux";
import {
  TASK_TYPES_MAP,
  urls,
  ClientEntityProps,
  TaskEntityProps,
  DATE_FORMATS,
  TOOLTIP_SHOW_DELAY,
  State,
} from "../../../../constants";
import {
  ClientsPersonalContext,
  defaultErrorHandler,
  getDateWithTimezone,
  getFullUrl,
} from "../../../../utils";

import style from "./card.module.scss";
import {
  CheckIcon,
  ClockIcon,
  DeleteIcon,
  ViewIcon,
} from "../../../../assets/icons";

const { Paragraph, Text } = Typography;

interface CardProps {
  title?: string;
  task: TaskEntityProps;
  onComplete: (task: TaskEntityProps) => void;
  onDelete: (task: TaskEntityProps) => void;
  onView: (task: TaskEntityProps) => void;
  dateFormat?: string;
}

export const Card: React.FC<CardProps> = ({
  task,
  dateFormat = DATE_FORMATS.TIME,
  onDelete,
  onComplete,
  onView,
  title = "",
}) => {
  const theme = useSelector((state: State) => state?.app?.theme);
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
      <ClockIcon />
      <Text strong style={{ marginLeft: "4px" }}>
        {getDateWithTimezone(date).format(dateFormat)}
      </Text>
    </div>
  ) : null;

  const handleView = useCallback(() => {
    onView(task);
  }, [onView, task]);

  const handleComplete = useCallback(() => {
    onComplete(task);
  }, [onComplete, task]);

  const handleDelete = useCallback(() => {
    onDelete(task);
  }, [onDelete, task]);

  const actions = [
    <Tooltip
      key="complete"
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      title={t("tooltip.complete")}
    >
      <CheckIcon className={style.hovered} onClick={handleComplete} />
    </Tooltip>,
    <Tooltip
      key="view"
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      title={t("tooltip.edit")}
    >
      <ViewIcon
        className={style.hovered}
        onClick={handleView}
        colored={theme === "light"}
      />
    </Tooltip>,
    <Tooltip
      key="delete"
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      title={t("tooltip.delete")}
    >
      <Popconfirm title={t("delete.confirm")} onConfirm={handleDelete}>
        <DeleteIcon className={style.hovered} />
      </Popconfirm>
    </Tooltip>,
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
    <Skeleton.Input style={{ width: "200px" }} active size="small" />
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
