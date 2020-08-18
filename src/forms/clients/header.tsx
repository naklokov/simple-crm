import React, { useCallback, useState, SyntheticEvent } from "react";
import { FormHeader } from "../../components/form-header";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "../../constants";
import { Drawer } from "antd";
import { FormFooter } from "../../components";

const { CLIENTS } = PERMISSIONS;

export const ClientsHeader = () => {
  const [t] = useTranslation("clients");

  const handleClickAdd = useCallback(() => {
    console.log("Go to client page");
  }, []);

  return (
    <React.Fragment>
      <FormHeader
        title={t("title")}
        addButtonTitle={t("add.button.title")}
        addPermissions={[CLIENTS.ADMIN, CLIENTS.ADD]}
        onClickAdd={handleClickAdd}
      />
    </React.Fragment>
  );
};

export default ClientsHeader;
