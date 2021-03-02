import React, { useCallback, useEffect, useState } from "react";
import { ClientEntityProps, urls } from "../../../../constants";
import { notification, Skeleton, Typography } from "antd";
import { getFullUrl } from "../../../common";
import { useFetch } from "../../../hooks";
import { History } from "history";

interface TitleProps {
  id: string;
  clientId: string;
  history: History;
  onClickLink: (id: string) => void;
}

export const Title = ({ id, clientId, history, onClickLink }: TitleProps) => {
  const [client, setClient] = useState({} as ClientEntityProps);
  const { loading, response } = useFetch({
    url: getFullUrl(urls.clients.entity, clientId),
  });

  const handleClickCurrent = useCallback(() => {
    onClickLink?.(id);
    notification.close(id);
    history.push(getFullUrl(urls.clients.path, clientId));
  }, [history, onClickLink]);

  useEffect(() => {
    if (response) {
      setClient(response?.data ?? {});
    }
  }, [response]);

  const skeleton = (
    <Skeleton.Input style={{ width: "200px" }} active={true} size={"small"} />
  );

  return (
    <>
      {loading ? (
        skeleton
      ) : (
        <Typography.Link onClick={handleClickCurrent} target="_blank">
          {client.shortName}
        </Typography.Link>
      )}
    </>
  );
};
