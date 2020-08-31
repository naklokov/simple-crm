import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { formConfig, urls, TabProps } from "../../../../constants";
import { Table } from "../../../../components";
import { fillTemplate, defaultErrorHandler } from "../../../../utils";
import { useParams } from "react-router";

export const Contacts = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [t] = useTranslation("clientCardContacts");
  const { id } = useParams();
  const {
    UPPER: { tabs },
  } = formConfig.clientCard;

  const contactsTab =
    tabs.find(({ tabCode }) => tabCode === "contacts") || ({} as TabProps);

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const url = fillTemplate(urls.contacts.entity, { id });
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
  }, []);

  const handleView = useCallback((id) => {
    alert("open " + id);
  }, []);

  const handleDelete = useCallback((deletedId) => {
    try {
      setTableLoading(true);
      const removed = contacts.filter(({ id }) => id !== deletedId);
      setContacts(removed);
    } finally {
      setTableLoading(false);
    }
  }, []);

  return (
    <div>
      <Table
        columns={contactsTab.columns}
        actions={contactsTab.actions}
        loading={tableLoading}
        onViewRow={handleView}
        onDeleteRow={handleDelete}
        dataSource={contacts}
        withSearch
      />
    </div>
  );
};

export default Contacts;
