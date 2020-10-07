import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { FORM_NAMES, PERMISSIONS_SET } from "../../../../constants";
import { useFormValues } from "../../../../utils";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface DeleteProps {
  onClick: () => void;
}

export const Delete = ({ onClick }: DeleteProps) => {
  const [t] = useTranslation("clientCard");
  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);
  return (
    <ComponentPermissionsChecker
      availablePermissions={PERMISSIONS_SET.CLIENT_DELETE}
      isOwner={values?.isOwner}
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
