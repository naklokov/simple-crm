import { PhoneTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface CallProps {
  onClick: () => void;
}

const {
  CLIENTS: { ADMIN, GET, GET_OWNER },
} = PERMISSIONS;

export const Call = ({ onClick }: CallProps) => {
  const [t] = useTranslation("clientCard");
  return (
    <ComponentPermissionsChecker availablePermissions={[ADMIN, GET, GET_OWNER]}>
      <Popconfirm
        title={t("confirm.call")}
        onConfirm={onClick}
        placement="left"
      >
        <Button icon={<PhoneTwoTone twoToneColor="#52c41a" />}>
          {t("button.call")}
        </Button>
      </Popconfirm>
    </ComponentPermissionsChecker>
  );
};

export default Call;
