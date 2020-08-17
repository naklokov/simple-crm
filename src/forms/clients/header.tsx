import React, { useCallback, useState, SyntheticEvent } from "react";
import { FormHeader } from "../../components/form-header";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "../../constants";
import { Drawer } from "antd";
import { FormFooter } from "../../components";

const { CLIENTS } = PERMISSIONS;

export const ClientsHeader = () => {
  const [t] = useTranslation("clients");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleAdd = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <React.Fragment>
      <FormHeader
        title={t("title")}
        addButtonTitle={t("add.button.title")}
        addPermissions={[CLIENTS.ADMIN, CLIENTS.ADD]}
        onClickAdd={handleAdd}
      />
      <Drawer
        title={t("clients.entity.add")}
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={drawerOpen}
      >
        <p>Text</p>
        <FormFooter
          loading={submitLoading}
          disabled={submitDisabled}
          permissions={[CLIENTS.ADMIN, CLIENTS.UPDATE, CLIENTS.UPDATE_OWNER]}
          onCancel={handleClose}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ClientsHeader;
