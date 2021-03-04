import { Typography, notification } from "antd";
import moment from "moment-timezone";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { urls } from "../../../../constants";
import { pluralize } from "../../../common";
import { Content } from "../content";

interface OverdueContentProps {
  id: string;
  total: number;
  history: any;
  onClickLink: (id: string) => void;
}

const { Text, Link } = Typography;

export const OverdueContent = ({
  id,
  total: count,
  history,
  onClickLink,
}: OverdueContentProps) => {
  const [t] = useTranslation("notifications");

  const handleClickOverdue = useCallback(() => {
    onClickLink?.(id);
    notification.close(id);
    history?.push(urls.tasks.path);
  }, [history, onClickLink]);

  const overdueCountLink = pluralize(count, [
    t("overdue.tasks.count.link.one", { count }),
    t("overdue.tasks.count.link.some", { count }),
    t("overdue.tasks.count.link.many", { count }),
  ]);

  const text = t("overdue.tasks.description.prev");

  const content = (
    <>
      <Text>{text}</Text>
      <Link onClick={handleClickOverdue}>{overdueCountLink}</Link>
    </>
  );

  const dateTime = moment().toISOString();

  return <Content date={dateTime} description={content} />;
};

export default OverdueContent;
