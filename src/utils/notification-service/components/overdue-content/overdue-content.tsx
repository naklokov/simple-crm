import { Typography, notification } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { urls } from "../../../../constants";
import { pluralize } from "../../../common";

interface OverdueContentProps {
  id: string;
  total: number;
  history: any;
}

const { Text, Link } = Typography;

export const OverdueContent = ({
  id,
  total: count,
  history,
}: OverdueContentProps) => {
  const [t] = useTranslation("notification");

  const handleClickOverdue = useCallback(() => {
    notification.close(id);
    history?.push(urls.tasks.path);
  }, [history]);

  const overdueCountLink = pluralize(count, [
    t("overdue.tasks.count.link.one", { count }),
    t("overdue.tasks.count.link.some", { count }),
    t("overdue.tasks.count.link.many", { count }),
  ]);

  const description = t("overdue.tasks.description.prev");

  return (
    <React.Fragment>
      <Text>{description}</Text>
      <Link onClick={handleClickOverdue}>{overdueCountLink}</Link>
    </React.Fragment>
  );
};

export default OverdueContent;
