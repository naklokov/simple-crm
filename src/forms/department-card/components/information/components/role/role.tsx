import React, { ReactNode, useCallback, useMemo } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  ProfileInfoEntityProps,
  urls,
  USER_ROLES_ID,
  QueryProps,
  TOOLTIP_SHOW_DELAY,
} from "../../../../../../constants";
import {
  getFullUrl,
  defaultSuccessHandler,
  defaultErrorHandler,
} from "../../../../../../utils";
import { ComponentPermissionsChecker } from "../../../../../../wrappers";
import { RoleRow } from "./components";

interface RoleProps {
  drawer: ReactNode;
  rows: ProfileInfoEntityProps[];
  rowTitle: string;
  loading?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  permissions?: string[];
  onDelete?: (id: string) => void;
}

export const Role: React.FC<RoleProps> = ({
  drawer,
  rows,
  rowTitle,
  onDelete,
  loading = false,
  header = null,
  footer = null,
  permissions = [],
}) => {
  const [t] = useTranslation("departmentInformation");
  const { id: departmentId } = useParams<QueryProps>();

  const handleClickDelete = useCallback(
    async (id: string) => {
      try {
        const url = getFullUrl(urls.userProfiles.entity, id);
        await axios.put(url, {
          userRoleId: USER_ROLES_ID.ROLE_MANAGER,
          departmentId,
        });
        defaultSuccessHandler(t("success.delete"));
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        onDelete?.(id);
      }
    },
    [onDelete, departmentId, t]
  );

  const getActions = useMemo(
    () => (id: string, canUpdate: boolean = false) => (
      <ComponentPermissionsChecker
        availablePermissions={permissions}
        hasRight={canUpdate}
      >
        <Popconfirm
          title={t("actions.confirm.delete")}
          onConfirm={() => handleClickDelete(id)}
          placement="left"
        >
          <Tooltip
            mouseEnterDelay={TOOLTIP_SHOW_DELAY}
            placement="topRight"
            title={t("actions.delete.tooltip")}
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </ComponentPermissionsChecker>
    ),
    [handleClickDelete, permissions, t]
  );

  return (
    <Spin spinning={loading}>
      {drawer}
      {header}
      {rows.map(({ id = "", fullName, phone, email, isOwner }) => (
        <RoleRow
          style={{ marginTop: "16px" }}
          key={id}
          title={rowTitle}
          fullName={fullName}
          phone={phone}
          email={email}
          actions={getActions(id, isOwner?.UPDATE)}
        />
      ))}
      {footer}
    </Spin>
  );
};

export default Role;
