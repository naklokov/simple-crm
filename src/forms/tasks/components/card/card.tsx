import React, { useCallback, useContext, useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";
import {
  CheckOutlined,
  ClockCircleTwoTone,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  Card as CardUI,
  Popconfirm,
  Skeleton,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "query-string";
import {
  TASK_TYPES_MAP,
  urls,
  ClientEntityProps,
  TaskEntityProps,
  DATE_FORMATS,
  TOOLTIP_SHOW_DELAY,
} from "../../../../constants";
import {
  getDateWithTimezone,
  getFullUrl,
  useClientTimeZone,
  useFetch,
} from "../../../../utils";

import style from "./card.module.scss";

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
  const {
    clientId,
    taskEndDate: date,
    taskDescription: description,
    taskType: type,
  } = task;

  const [t] = useTranslation("card");
  const [client, loading] = useFetch<ClientEntityProps>({
    url: getFullUrl(urls.clients.entity, clientId),
    cache: true,
    cacheMaxAge: "short",
  });
  const { tzTag } = useClientTimeZone(client.clientTimeZone);

  const extra = date ? (
    <div>
      <ClockCircleTwoTone />
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
      <CheckOutlined
        className={cn(style.complete, style.hovered)}
        onClick={handleComplete}
      />
    </Tooltip>,
    <Tooltip
      key="view"
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      title={t("tooltip.edit")}
    >
      <FormOutlined
        className={cn(style.view, style.hovered)}
        onClick={handleView}
      />
    </Tooltip>,
    <Tooltip
      key="delete"
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      title={t("tooltip.delete")}
    >
      <Popconfirm title={t("delete.confirm")} onConfirm={handleDelete}>
        <DeleteOutlined className={cn(style.delete, style.hovered)} />
      </Popconfirm>
    </Tooltip>,
  ];

  const titleContent = (
    <Space>
      <Link
        to={{
          pathname: getFullUrl(urls.clients.path, clientId),
          search: stringify({ "lower:tab": "tasks" }),
        }}
      >
        {client?.shortName ?? title}
      </Link>
      {tzTag}
    </Space>
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
