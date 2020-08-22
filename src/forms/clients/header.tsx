import React, { useCallback } from "react";
import { FormHeader } from "../../components/form-header";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "../../constants";

const { CLIENTS } = PERMISSIONS;

export const ClientsHeader = () => {
  const [t] = useTranslation("clients");

  const handleClickAdd = useCallback(() => {
    alert("Переход на страницу создания клиента");
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
