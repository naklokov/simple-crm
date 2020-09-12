import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "../../components";
import { urls, ClientEntityProps, formConfig } from "../../constants";

import style from "./clients.module.scss";
import { State } from "../../__data__/interfaces";
import { setClients, setTableLoading } from "../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import {
  getFiteredEntityArray,
  useFetch,
  defaultErrorHandler,
  defaultSuccessHandler,
} from "../../utils";
import { TablePaginationConfig } from "antd/lib/table";
import { fetchData } from "../../components/table/utils";
import { useTranslation } from "react-i18next";

const { ACTIONS, COLUMNS } = formConfig.clients;
const DEFAULT_PAGE_SIZE = 10;

interface ClientsProps {
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Clients = ({ setClients, clients }: ClientsProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = DEFAULT_PAGE_SIZE;
  const url = urls.clients.entity;
  const { response: responseMeta } = useFetch({
    url,
    params: { tableMeta: true },
  });

  useEffect(() => {
    fetchDataSource({ page, pageSize });
  }, []);

  useEffect(() => {
    setTotal(responseMeta?.data?.totalCount ?? 0);
  }, [responseMeta]);

  const fetchDataSource = async (params: {
    page: number;
    pageSize: number;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(url, { params });
      setClients(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setClients(getFiteredEntityArray(id, clients));
    },
    [clients]
  );

  const handlePageChange = useCallback(
    (page, pageSize) => {
      setPage(page);
      fetchDataSource({ page, pageSize });
    },
    [total]
  );

  const serverPagination: TablePaginationConfig = {
    pageSize,
    total,
    onChange: handlePageChange,
    current: page,
  };

  return (
    <div className={style.container}>
      <Table
        columns={COLUMNS}
        actions={ACTIONS}
        loading={loading}
        pagination={serverPagination}
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
