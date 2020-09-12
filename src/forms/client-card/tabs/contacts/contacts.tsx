import React, { useState, useEffect, useCallback } from "react";
import { urls, TabProps, formConfig } from "../../../../constants";
import { Table } from "../../../../components";
import {
  getFiteredEntityArray,
  getUpdatedEntityArray,
  useFetch,
  getRsqlQuery,
  defaultSuccessHandler,
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
  const [initialValues, setInitialValues] = useState({});

  const [contacts, setContacts] = useState([] as any[]);
  const { id: clientId } = useParams();

  const params = getRsqlQuery({ clientId });
  const { response, loading } = useFetch({ url: urls.contacts.entity, params });

  useEffect(() => {
    setContacts(response?.data ?? []);
  }, [response]);

  const handleAddContact = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleViewRow = useCallback(
    (id) => {
      const initialValues = contacts.find((contact) => id === contact.id);
      setInitialValues(initialValues);
      setViewDrawerVisible(true);
    },
    [contacts]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setContacts(getFiteredEntityArray(id, contacts));
    },
    [contacts]
  );

  const handleCloseAddDrawer = useCallback(
    (event, contact) => {
      setAddDrawerVisible(false);

      if (contact) {
        setContacts([...contacts, contact]);
      }
    },
    [contacts]
  );

  const handleCloseViewDrawer = useCallback(
    (event, contact) => {
      setViewDrawerVisible(false);

      if (contact) {
        setContacts(getUpdatedEntityArray(contact, contacts));
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
        initialValues={initialValues}
        fields={drawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
      />
      <div className={style.container}>
        <Table
          columns={tab.columns}
          actions={tab.actions}
          loading={loading}
          pagination={{ pageSize: 5 }}
          onViewRow={handleViewRow}
          onDeleteRow={handleDeleteRow}
          dataSource={contacts}
          addButton={<Header onClickAdd={handleAddContact} />}
        />
      </div>
    </div>
  );
};

export default Contacts;
