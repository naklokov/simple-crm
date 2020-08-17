import React, { useEffect, useCallback, useState } from "react";
import { Breadcrumb, Typography, Button, Drawer } from "antd";
import { useHistory } from "react-router";
import { getBreadcrumbItems } from "./utils";
import noop from "lodash/noop";

import style from "./form-header.module.scss";
import { ComponentPermissionsChecker } from "../../wrappers";

interface FormHeaderProps {
  title: string;
  addButtonTitle?: string;
  onClickAdd?: (event: React.MouseEvent) => void;
  addPermissions?: string[];
  children?: JSX.Element;
}

export const FormHeader = ({
  title,
  onClickAdd = noop,
  addButtonTitle,
  addPermissions = [],
  children,
}: FormHeaderProps) => {
  return (
    <div className={style.container}>
      <Breadcrumb className={style.breadcrumb}>
        {getBreadcrumbItems(title)}
      </Breadcrumb>
      <Typography.Title className={style.title} level={3}>
        {title}
      </Typography.Title>
      {addButtonTitle && (
        <ComponentPermissionsChecker availablePermissions={addPermissions}>
          <Button type="primary" className={style.button} onClick={onClickAdd}>
            {addButtonTitle}
          </Button>
        </ComponentPermissionsChecker>
      )}
      <div>{children}</div>
    </div>
  );
};

export default FormHeader;
