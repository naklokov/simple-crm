import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { urls, TabProps, formConfig } from "../../../../constants";
import { Table } from "../../../../components";
import {
  fillTemplate,
  defaultErrorHandler,
  getUpdatedEntityArray,
} from "../../../../utils";
import { useParams } from "react-router";
import { Header } from "./header";
import { AddContactDrawer, ViewContactDrawer } from "../../drawers";

import style from "./contacts.module.scss";

const {
  clientCard: {
    UPPER: { drawers },
  },
} = formConfig;

const drawer = drawers.find(({ code }) => code === "contact");

interface ContactsProps {
  tab: TabProps;
}

export const Contacts = ({ tab }: ContactsProps) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const [contacts, setContacts] = useState([] as any[]);
  const [t] = useTranslation("clientCardContacts");
  const { id } = useParams();

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const url = fillTemplate(urls.contacts.clientContacts, { id });
      const response = await axios.get(url);
      setContacts(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, [id]);

  const handleView = useCallback(
    (id) => {
      const initialValues = contacts.find((contact) => id === contact.id);
      setInitialValues(initialValues);
      setViewDrawerVisible(true);
    },
    [contacts]
  );

  const handleAdd = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

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
        const updated = getUpdatedEntityArray(contact, contacts);
        setContacts(updated);
      }
    },
    [contacts]
  );

  const handleDelete = useCallback(
    (deletedId) => {
      try {
        setTableLoading(true);
        const removed = contacts.filter(({ id }) => id !== deletedId);
        setContacts(removed);
      } finally {
        setTableLoading(false);
      }
    },
    [contacts]
  );

  return (
    <div>
      <AddContactDrawer
        visible={addDrawerVisible}
        onClose={handleCloseAddDrawer}
        fields={drawer?.fields || []}
      />
      <ViewContactDrawer
        visible={viewDrawerVisible}
        initialValues={initialValues}
        fields={drawer?.fields || []}
        onClose={handleCloseViewDrawer}
      />
      <div className={style.container}>
        <Table
          columns={tab.columns}
          actions={tab.actions}
          loading={tableLoading}
          pageCount={5}
          onViewRow={handleView}
          onDeleteRow={handleDelete}
          dataSource={contacts}
          addButton={<Header onClickAdd={handleAdd} />}
        />
      </div>
    </div>
  );
};

export default Contacts;
