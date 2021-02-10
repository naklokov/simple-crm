import React from "react";
import { Button, Space } from "antd";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import { FORM_NAMES, PERMISSIONS_SET } from "../../../../constants";
import { useTranslation } from "react-i18next";

import style from "./contacts.module.scss";
import { useFormValues } from "../../../../utils";

interface HeaderProps {
  onClickAdd: () => void;
}

export const Header = ({ onClickAdd }: HeaderProps) => {
  const [t] = useTranslation("clientCardContacts");

  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);

  return (
    // завязка на UPDATE клиента, т.к. контакт привязывается конкретно к клиенту
    <ComponentPermissionsChecker hasRight={values?.isOwner?.UPDATE}>
      <Button type="primary" className={style.button} onClick={onClickAdd}>
        {t("title.add")}
      </Button>
    </ComponentPermissionsChecker>
  );
};
