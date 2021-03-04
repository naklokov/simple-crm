import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BREADCRUMB_ROUTES } from "../../constants";
import { getItemRender } from "../../utils";
import { PageHeader } from "antd";

interface TasksHeaderProps {
  extra: ReactNode;
}

export const TasksHeader = ({ extra }: TasksHeaderProps) => {
  const [t] = useTranslation("tasks");

  const breadcrumb = {
    routes: BREADCRUMB_ROUTES.TASKS,
    itemRender: getItemRender,
  };

  return (
    <PageHeader
      ghost={false}
      title={t("title")}
      breadcrumb={breadcrumb}
      extra={extra}
    />
  );
};

export default TasksHeader;
