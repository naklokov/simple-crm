import { Button, Typography, notification } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { urls } from "../../../../constants";

interface OverdueNotificationProps {
  id: string;
  total: number;
  history: any;
}

export const OverdueNotification = ({
  id,
  total,
  history,
}: OverdueNotificationProps) => {
  const [t] = useTranslation("notification");

  const handleClickOverdue = useCallback(() => {
    notification.close(id);
    history?.push(urls.tasks.path);
  }, [history]);

  const description = t("overdue.message.description", {
    length: total,
  });

  return (
    <React.Fragment>
      <Typography.Text>{description}</Typography.Text>
      <Button
        style={{ padding: 0, cursor: "pointer" }}
        type="link"
        onClick={handleClickOverdue}
      >
        {t("link.to.tasks")}
      </Button>
    </React.Fragment>
  );
};

export default OverdueNotification;
