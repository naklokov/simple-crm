import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Popconfirm, Skeleton, Typography } from "antd";
import { getDateWithTimezone, getFullUrl } from "../../../../utils";
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
import { State } from "../../../../__data__/interfaces";
import { connect } from "react-redux";

interface CardProps {
  id: string;
  clientId: string;
  clients: ClientEntityProps[];
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
  clients,
  date,
  taskType,
  taskDescription,
  onDelete,
  onComplete,
  format = DATE_FORMATS.TIME,
  title = "",
}: CardProps) => {
  const [t] = useTranslation("card");
  const client = useMemo(() => clients.find(({ id }) => id === clientId), [
    clients,
    clientId,
  ]);

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

  return (
    <CardUI title={titleContent} extra={extra} size="small" actions={actions}>
      <strong>{TASK_TYPES_MAP[taskType]}</strong>
      {taskDescription && (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
          {taskDescription}
        </Typography.Paragraph>
      )}
    </CardUI>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients,
});

export default connect(mapStateToProps)(Card);
