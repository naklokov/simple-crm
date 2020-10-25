import React from "react";
import { useTranslation } from "react-i18next";
import { PERMISSIONS, BREADCRUMB_ROUTES } from "../../constants";
import { getItemRender } from "../../utils";
import { Button, PageHeader } from "antd";
import { ComponentPermissionsChecker } from "../../wrappers";

const { TASKS } = PERMISSIONS;

interface TasksHeaderProps {
  onAddClick: () => void;
}

export const TasksHeader = ({ onAddClick }: TasksHeaderProps) => {
  const [t] = useTranslation("tasks");

  const breadcrumb = {
    routes: BREADCRUMB_ROUTES.TASKS,
    itemRender: getItemRender,
  };

  const extra = (
    <ComponentPermissionsChecker availablePermissions={[TASKS["ADD.ALL"]]}>
      <Button type="primary" onClick={onAddClick}>
        {t("button.add.title")}
      </Button>
    </ComponentPermissionsChecker>
  );

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
