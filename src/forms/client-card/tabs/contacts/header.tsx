import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import { ClientEntityProps, FORM_NAMES } from "../../../../constants";

import style from "./contacts.module.scss";
import { useFormValues } from "../../../../utils";

interface HeaderProps {
  onClickAdd: () => void;
}

export const Header = ({ onClickAdd }: HeaderProps) => {
  const [t] = useTranslation("clientCardContacts");

  const [client] = useFormValues<ClientEntityProps>(FORM_NAMES.CLIENT_CARD);

  return (
    // завязка на UPDATE клиента, т.к. контакт привязывается конкретно к клиенту
    <ComponentPermissionsChecker hasRight={client?.isOwner?.UPDATE}>
      <Button type="primary" className={style.button} onClick={onClickAdd}>
        {t("title.add")}
      </Button>
    </ComponentPermissionsChecker>
  );
};
