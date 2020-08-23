import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "../../components";
import { urls, ClientEntityProps, formConfig } from "../../constants";

import style from "./clients.module.scss";
import { State } from "../../__data__/interfaces";
import { setClients } from "../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { defaultErrorHandler } from "../../utils";
import { useTranslation } from "react-i18next";

interface ClientsProps {
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Clients = ({ setClients, clients }: ClientsProps) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [t] = useTranslation("clients");
  const { ACTIONS, COLUMNS } = formConfig.clients;

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(urls.clients.entity);
      setClients(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, []);

  const handleDelete = useCallback(
    (deletedId) => {
      try {
        setTableLoading(true);
        const removed = clients.filter(({ id }) => id !== deletedId);
        setClients(removed);
      } finally {
        setTableLoading(false);
      }
    },
    [clients]
  );

  return (
    <div className={style.container}>
      <Table
        columns={COLUMNS}
        actions={ACTIONS}
        loading={tableLoading}
        onDeleteRow={handleDelete}
        dataSource={clients}
        withSearch
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
