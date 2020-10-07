import React from "react";
import { Button, Space } from "antd";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  FORM_NAMES,
  PERMISSIONS,
  PERMISSIONS_SET,
} from "../../../../constants";
import { useTranslation } from "react-i18next";

import style from "./contacts.module.scss";
import { useFormValues } from "../../../../utils";

const {
  CLIENTS: { UPDATE_OWNER, UPDATE },
} = PERMISSIONS;

interface HeaderProps {
  onClickAdd: () => void;
}

export const Header = ({ onClickAdd }: HeaderProps) => {
  const [t] = useTranslation("clientCardContacts");

  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);

  return (
    <ComponentPermissionsChecker
      isOwner={values?.isOwner}
      availablePermissions={PERMISSIONS_SET.CLIENT_UPDATE}
    >
      <Button type="primary" className={style.button} onClick={onClickAdd}>
        {t("title.add")}
      </Button>
    </ComponentPermissionsChecker>
  );
};
