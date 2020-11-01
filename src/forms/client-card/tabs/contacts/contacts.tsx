import React, { useState, useEffect, useCallback } from "react";
import {
  urls,
  TabProps,
  formConfig,
  QueryProps,
  FORM_NAMES,
} from "../../../../constants";
import { Table } from "../../../../components";
import {
  getFiteredEntityArray,
  getUpdatedEntityArray,
  useFetch,
  getRsqlParams,
  defaultSuccessHandler,
  useFormValues,
} from "../../../../utils";
import { useParams } from "react-router";
import { Header } from "./header";
import { AddContactDrawer, ViewContactDrawer } from "../../../../drawers";

import style from "./contacts.module.scss";
import { useTranslation } from "react-i18next";

const {
  clientCard: {
    upper: { drawers },
  },
} = formConfig;

const drawer = drawers.find(({ code }) => code === "contact");

interface ContactsProps {
  tab: TabProps;
}

export const Contacts = ({ tab }: ContactsProps) => {
  const [t] = useTranslation("clientCardContacts");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const { update: viewFormUpdate } = useFormValues(FORM_NAMES.CONTACT_VIEW);

  const [contacts, setContacts] = useState([] as any[]);
  const { id: clientId } = useParams<QueryProps>();

  const query = getRsqlParams([{ key: "clientId", value: clientId }]);
  const { response, loading } = useFetch({
    url: urls.contacts.entity,
    params: { query },
  });

  useEffect(() => {
    setContacts(response?.data ?? []);
  }, [response]);

  const handleAddContact = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleViewContact = useCallback(
    (id) => {
      viewFormUpdate(contacts.find((o) => o.id == id));
      setViewDrawerVisible(true);
    },
    [contacts]
  );

  const handleDeleteContact = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setContacts(getFiteredEntityArray(id, contacts));
    },
    [contacts]
  );

  const handleCloseAddDrawer = useCallback(
    (event: any, data: any) => {
      setAddDrawerVisible(false);
      if (data) {
        setContacts([...contacts, data]);
      }
    },
    [contacts]
  );

  const handleCloseViewDrawer = useCallback(
    (event: any, data: any) => {
      setViewDrawerVisible(false);
      if (data) {
        setContacts(getUpdatedEntityArray(data, contacts));
      }
    },
    [contacts]
  );

  return (
    <div>
      <AddContactDrawer
        visible={addDrawerVisible}
        onClose={handleCloseAddDrawer}
        fields={drawer?.fields ?? []}
      />
      <ViewContactDrawer
        title={drawer?.name ?? ""}
        visible={viewDrawerVisible}
        fields={drawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
      />
      <div className={style.container}>
        <Table.Client
          table={tab}
          loading={loading}
          pagination={{ pageSize: 5 }}
          onViewRow={handleViewContact}
          onDeleteRow={handleDeleteContact}
          dataSource={contacts}
          extraHeader={<Header onClickAdd={handleAddContact} />}
          actionsPermissions={[]}
        />
      </div>
    </div>
  );
};

export default Contacts;
