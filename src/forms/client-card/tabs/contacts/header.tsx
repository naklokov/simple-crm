import React from "react";
import { Button, Space } from "antd";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import { PERMISSIONS } from "../../../../constants";
import { useTranslation } from "react-i18next";

import style from "./contacts.module.scss";

const { CLIENTS } = PERMISSIONS;

interface HeaderProps {
  onClickAdd: () => void;
}

export const Header = ({ onClickAdd }: HeaderProps) => {
  const [t] = useTranslation("clientCardContacts");
  return (
    <ComponentPermissionsChecker
      availablePermissions={[
        CLIENTS.ADD,
        CLIENTS.ADMIN,
        CLIENTS.UPDATE,
        CLIENTS.UPDATE_OWNER,
      ]}
    >
      <Button type="primary" className={style.button} onClick={onClickAdd}>
        {t("title.add")}
      </Button>
    </ComponentPermissionsChecker>
  );
};
