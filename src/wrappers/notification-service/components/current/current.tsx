import { Button, Typography, notification, Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ClientEntityProps,
  TaskEntityProps,
  urls,
} from "../../../../constants";
import { getFullUrl, useFetch } from "../../../../utils";

interface CurrentDescriptionProps {
  task: TaskEntityProps;
  history: any;
  notificationKey: string;
}

export const CurrentDescription = ({
  task,
  history,
  notificationKey,
}: CurrentDescriptionProps) => {
  const [t] = useTranslation("notification");
  const [client, setClient] = useState({} as ClientEntityProps);
  const { loading, response } = useFetch({
    url: getFullUrl(urls.clients.entity, task.clientId),
  });

  useEffect(() => {
    if (response) {
      setClient(response?.data ?? {});
    }
  }, [response]);

  const handleClickCurrent = useCallback(() => {
    notification.close(notificationKey);
    history.push(getFullUrl(urls.clients.path, task.clientId));
  }, [history]);

  const titleSkeleton = (
    <Skeleton.Input style={{ width: "200px" }} active={true} size={"small"} />
  );

  return (
    <React.Fragment>
      {loading ? (
        titleSkeleton
      ) : (
        <Button
          style={{ padding: 0, cursor: "pointer" }}
          type="link"
          onClick={handleClickCurrent}
        >
          {client.shortName}
        </Button>
      )}
      <Typography.Paragraph>{task.taskDescription}</Typography.Paragraph>
    </React.Fragment>
  );
};

export default CurrentDescription;
