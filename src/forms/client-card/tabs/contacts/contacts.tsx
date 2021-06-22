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
import { FormWrapper } from "../../../../wrappers";

const {
  clientCard: {
    upper: { drawers },
  },
} = formConfig;

const drawer = drawers.find(({ code }) => code === "contact");

export const Contacts = ({ tab, formName }: TabPaneFormProps) => {
  const [t] = useTranslation("clientCardContacts");
  const dispatch = useDispatch();
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [, setClient] = useFormValues<ContactEntityProps>(
    FORM_NAMES.CONTACT_VIEW
  );

  const { id: clientId } = useParams<QueryProps>();

  const query = getRsqlParams([{ key: "clientId", value: clientId }]);
  const [contacts, loading, reload] = useFetch<ContactEntityProps[]>({
    url: urls.contacts.entity,
    params: { query },
  });

  useEffect(() => {
    dispatch(setTableLoading(loading));
  }, [loading, dispatch]);

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

  const handleAddContact = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleViewContact = useCallback(
    (id: string) => {
      const values = contacts?.find((o) => o.id === id);
      if (values) {
        setClient(values);
      }
      setViewDrawerVisible(true);
    },
    [contacts, setClient]
  );

  const handleDeleteContact = useCallback(
    (id) => {
      fetchDelete(id);
    },
    [fetchDelete]
  );

  const handleCloseAddDrawer = useCallback(
    (data?: any) => {
      setAddDrawerVisible(false);
      if (data) {
        reload();
      }
    },
    [reload]
  );

  const handleCloseViewDrawer = useCallback(
    (data?: any) => {
      setViewDrawerVisible(false);
      if (data) {
        reload();
      }
    },
    [reload]
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
      <FormWrapper name={formName}>
        <Table.Client
          columns={tab?.columns}
          actions={tab?.actions}
          links={tab?._links}
          pagination={{ pageSize: 5 }}
          onViewRow={handleViewContact}
          onDeleteRow={handleDeleteContact}
          dataSource={contacts}
          extraTitle={<Header onClickAdd={handleAddContact} />}
        />
      </FormWrapper>
    </div>
  );
};

export default Contacts;
