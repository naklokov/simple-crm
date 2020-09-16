import { DeleteTwoTone, PhoneTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface DeleteProps {
  onClick: () => void;
  isOwner: boolean;
}

const {
  CLIENTS: { ADMIN, GET, GET_OWNER },
} = PERMISSIONS;

export const Delete = ({ onClick, isOwner }: DeleteProps) => {
  const [t] = useTranslation("clientCard");
  return (
    <ComponentPermissionsChecker
      availablePermissions={[ADMIN, GET, GET_OWNER]}
      isOwner={isOwner}
    >
      <Popconfirm
        title={t("confirm.delete")}
        onConfirm={onClick}
        placement="left"
      >
        <Button icon={<DeleteTwoTone twoToneColor="#f5222d" />}>
          {t("button.delete")}
        </Button>
      </Popconfirm>
    </ComponentPermissionsChecker>
  );
};

export default Delete;
