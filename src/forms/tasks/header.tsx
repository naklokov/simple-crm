import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PERMISSIONS, BREADCRUMB_ROUTES } from "../../constants";
import { getItemRender } from "../../utils";
import { Button, PageHeader } from "antd";
import { ComponentPermissionsChecker } from "../../wrappers";

const { TASKS } = PERMISSIONS;

export const TasksHeader = () => {
  const [t] = useTranslation("tasks");

  const handleClickAdd = useCallback(() => {
    alert("open drawer");
  }, []);

  const breadcrumb = {
    routes: BREADCRUMB_ROUTES.TASKS,
    itemRender: getItemRender,
  };

  const extra = (
    <ComponentPermissionsChecker
      availablePermissions={[TASKS.ADMIN, TASKS.ADD]}
    >
      <Button type="primary" onClick={handleClickAdd}>
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
