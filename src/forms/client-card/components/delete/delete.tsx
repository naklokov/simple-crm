import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, FORM_NAMES } from "../../../../constants";
import { useFormValues } from "../../../../utils";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface DeleteProps {
  onClick: () => void;
}

export const Delete = ({ onClick }: DeleteProps) => {
  const [t] = useTranslation("clientCard");
  const [client] = useFormValues<ClientEntityProps>(FORM_NAMES.CLIENT_CARD);
  return (
    <ComponentPermissionsChecker hasRight={client?.isOwner?.DELETE}>
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
