import React, { useCallback } from "react";
import { FormHeader } from "../../components/form-header";
import { useTranslation } from "react-i18next";
import { PERMISSIONS, urls, CLIENT_NEW_ID } from "../../constants";
import { useHistory } from "react-router";
import { getFullUrl } from "../../utils";

const { CLIENTS } = PERMISSIONS;

export const ClientsHeader = () => {
  const [t] = useTranslation("clients");
  const history = useHistory();

  const handleClickAdd = useCallback(() => {
    const url = getFullUrl(urls.clients.path, CLIENT_NEW_ID);
    history.push(url);
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
