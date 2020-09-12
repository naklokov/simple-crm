import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "../../components";
import { urls, ClientEntityProps, formConfig } from "../../constants";

import style from "./clients.module.scss";
import { State } from "../../__data__/interfaces";
import { setClients, setTableLoading } from "../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { getFiteredEntityArray, useFetch } from "../../utils";

const { ACTIONS, COLUMNS } = formConfig.clients;

interface ClientsProps {
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Clients = ({ setClients, clients }: ClientsProps) => {
  const { loading, response } = useFetch({ url: urls.clients.entity });

  useEffect(() => {
    setClients(response?.data ?? []);
  }, [response]);

  const handleDelete = useCallback(
    (id) => {
      setClients(getFiteredEntityArray(id, clients));
    },
    [clients]
  );

  return (
    <div className={style.container}>
      <Table
        columns={COLUMNS}
        actions={ACTIONS}
        loading={loading}
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
  bindActionCreators({ setClients, setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
