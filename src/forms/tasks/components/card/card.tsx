import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Card as CardUI, Skeleton, Space, Typography } from "antd";
import {
  defaultErrorHandler,
  getDateWithTimezone,
  getFullUrl,
  useFetch,
} from "../../../../utils";
import {
  DATE_FORMATS,
  TASK_TYPES_MAP,
  TaskTypeType,
  urls,
  ClientEntityProps,
} from "../../../../constants";
import { useTranslation } from "react-i18next";
import { State } from "../../../../__data__/interfaces";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setClients } from "../../../../__data__";
import { getClient } from "../../../client-card/utils";
import { isEmpty } from "lodash";
import { connect } from "react-redux";

interface CardProps {
  clientId: string;
  title?: string;
  taskType: TaskTypeType;
  taskDescription?: string;
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
  date?: string;
}

export const Card = ({
  clientId,
  date,
  taskType,
  taskDescription,
  clients,
  setClients,
  title = "",
}: CardProps) => {
  const client = getClient(clientId, clients);
  const [loading, setLoading] = useState(false);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        getFullUrl(urls.clients.entity, clientId)
      );
      const client = response?.data ?? {};
      setClients([...clients, client]);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEmpty(client)) {
      fetchClient();
    }
  }, [clients]);

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

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Card);
