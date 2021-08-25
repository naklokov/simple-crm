import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { notification, Skeleton, Space, Typography } from "antd";
import { History } from "history";
import { ClientEntityProps, urls } from "../../../../constants";
import { defaultErrorHandler, getFullUrl } from "../../../common";
import { ClientsPersonalContext } from "../../../context";
import { useClientTimeZone } from "../../../hooks";

interface TitleProps {
  id: string;
  clientId: string;
  history: History;
  onClickLink: (id: string) => void;
}

export const Title: React.FC<TitleProps> = ({
  id,
  clientId,
  history,
  onClickLink,
}) => {
  const [client, setClient] = useState({} as ClientEntityProps);
  const [loading, setLoading] = useState(false);
  const cachingClients = useContext(ClientsPersonalContext);
  const { tzTag } = useClientTimeZone(client?.clientTimeZone);

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

  const handleClickCurrent = useCallback(() => {
    onClickLink?.(id);
    notification.close(id);
  }, [history, onClickLink, clientId, id]);

  useEffect(() => {
    const cachingClient = cachingClients.find(
      ({ id: cachingClientId }) => cachingClientId === clientId
    );
    if (cachingClient) {
      setClient(cachingClient);
    } else {
      fetchClient();
    }
  }, []);

  const skeleton = (
    <Skeleton.Input style={{ width: "200px" }} active size="small" />
  );

  return (
    <>
      {loading ? (
        skeleton
      ) : (
        <Space>
          <Typography.Link
            href={getFullUrl(urls.clients.path, clientId)}
            onClick={handleClickCurrent}
            target="_blank"
          >
            {client.shortName}
          </Typography.Link>
          {tzTag}
        </Space>
      )}
    </>
  );
};
