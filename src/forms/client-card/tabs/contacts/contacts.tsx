import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  urls,
  formConfig,
  QueryProps,
  FORM_NAMES,
  TabPaneFormProps,
  ContactEntityProps,
} from "../../../../constants";
import { Table } from "../../../../components";
import {
  getUpdatedEntityArray,
  useFetch,
  getRsqlParams,
  defaultSuccessHandler,
  useFormValues,
  getFullUrl,
  defaultErrorHandler,
} from "../../../../utils";
import { Header } from "./header";
import { AddContactDrawer, ViewContactDrawer } from "../../../../drawers";
import { setTableLoading } from "../../../../__data__";

const {
  clientCard: {
    upper: { drawers },
  },
} = formConfig;

const drawer = drawers.find(({ code }) => code === "contact");

export const Contacts = ({ tab }: TabPaneFormProps) => {
  const [t] = useTranslation("clientCardContacts");
  const dispatch = useDispatch();
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const { update: viewFormUpdate } = useFormValues<ContactEntityProps>(
    FORM_NAMES.CONTACT_VIEW
  );

  const [contacts, setContacts] = useState([] as any[]);
  const { id: clientId } = useParams<QueryProps>();

  const query = getRsqlParams([{ key: "clientId", value: clientId }]);
  const { response, loading, reload } = useFetch({
    url: urls.contacts.entity,
    params: { query },
  });

  useEffect(() => {
    setTableLoading(loading);
  }, [loading]);

  const fetchDelete = useCallback(
    async (id: string) => {
      dispatch(setTableLoading(true));
      try {
        const url = getFullUrl(urls.contacts.entity, id);
        await axios.delete(url);
        reload();
        defaultSuccessHandler(t("message.success.delete"));
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        dispatch(setTableLoading(false));
      }
    },
    [reload, t, dispatch]
  );

  useEffect(() => {
    setContacts(response?.data ?? []);
  }, [response]);

  const handleAddContact = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleViewContact = useCallback(
    (id) => {
      viewFormUpdate(contacts.find((o) => o.id === id));
      setViewDrawerVisible(true);
    },
    [contacts, viewFormUpdate]
  );

  const handleDeleteContact = useCallback(
    (id) => {
      fetchDelete(id);
    },
    [fetchDelete]
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
      <form>
        <Table.Client
          table={tab}
          pagination={{ pageSize: 5 }}
          onViewRow={handleViewContact}
          onDeleteRow={handleDeleteContact}
          dataSource={contacts}
          extraTitle={<Header onClickAdd={handleAddContact} />}
        />
      </form>
    </div>
  );
};

export default Contacts;
