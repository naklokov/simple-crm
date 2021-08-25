import React from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { PhoneIcon } from "../../../../assets/icons";
import { ClientEntityProps, FORM_NAMES } from "../../../../constants";
import { useFormValues } from "../../../../utils";
import { ComponentPermissionsChecker } from "../../../../wrappers";

interface CallProps {
  onClick: () => void;
}

export const Call = ({ onClick }: CallProps) => {
  const [t] = useTranslation("clientCard");
  const [client] = useFormValues<ClientEntityProps>(FORM_NAMES.CLIENT_CARD);

  return (
    <ComponentPermissionsChecker hasRight={client?.isOwner?.UPDATE}>
      <Popconfirm
        title={t("confirm.call")}
        onConfirm={onClick}
        placement="left"
      >
        <Button icon={<PhoneIcon />}>{t("button.call")}</Button>
      </Popconfirm>
    </ComponentPermissionsChecker>
  );
};

export default Call;
