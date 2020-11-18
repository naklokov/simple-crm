import { Button, Typography, notification } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TaskEntityProps, urls } from "../../../../constants";

interface OverdueDescriptionProps {
  tasks: TaskEntityProps[];
  history: any;
}

export const OverdueDescription = ({
  tasks,
  history,
}: OverdueDescriptionProps) => {
  const [t] = useTranslation("notification");

  const handleClickOverdue = useCallback(() => {
    notification.close("overdue");
    history.push(urls.tasks.path);
  }, [history]);

  const description = t("overdue.message.description", {
    length: tasks.length,
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

export default OverdueDescription;
