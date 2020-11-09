import { PhoneTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { FORM_NAMES, PERMISSIONS_SET } from "../../../../constants";
import { useFormValues } from "../../../../utils";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface CallProps {
  onClick: () => void;
}

export const Call = ({ onClick }: CallProps) => {
  const [t] = useTranslation("clientCard");
  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);

  return (
    <ComponentPermissionsChecker
      availablePermissions={PERMISSIONS_SET.CLIENT_UPDATE}
      hasRight={values?.isOwner?.UPDATE}
    >
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
