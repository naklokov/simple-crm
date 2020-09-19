import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "../../components";
import {
  urls,
  ClientEntityProps,
  formConfig,
  RsqlParamProps,
  FetchParamsProps,
} from "../../constants";
import { getClientsRsqlQuery, getSearchRsqlParams } from "./utils";

import style from "./clients.module.scss";
import { State } from "../../__data__/interfaces";
import { setClients, setTableLoading } from "../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import {
  getFiteredEntityArray,
  defaultErrorHandler,
  defaultSuccessHandler,
  getSortedParams,
  getRsqlParams,
} from "../../utils";
import { TablePaginationConfig } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import ClientsHeader from "./header";

const { ACTIONS, COLUMNS, TABLES } = formConfig.clients;

interface ClientsProps {
  title?: string;
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
  fetchParams?: FetchParamsProps;
}

export const Clients = ({
  setClients,
  clients,
  fetchParams = {},
}: ClientsProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [rsqlParams, setRsqlParams] = useState([] as RsqlParamProps[]);
  const [total, setTotal] = useState(0);

  const url = urls.clients.paging;

  useEffect(() => {
    fetchDataSource();
  }, [url]);

  const fetchDataSource = async (params: any = {}) => {
    const query = getClientsRsqlQuery(rsqlParams, fetchParams);
    const prev = {
      page,
      pageSize,
      sortBy,
      rsqlParams,
    };

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          ...fetchParams.queryString,
          ...prev,
          ...params,
          query,
        },
      });

      const { totalCount, rows } = response?.data ?? {};
      setClients(rows);
      setTotal(totalCount);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (searched: string) => {
      const page = 1;
      const searchParams = getSearchRsqlParams(searched);
      if (searchParams) {
        setRsqlParams([searchParams]);
        setPage(page);
        fetchDataSource({ rsqlParams, page });
      }
    },
    [clients]
  );

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setClients(getFiteredEntityArray(id, clients));
    },
    [clients]
  );

  const handleChangeTable = useCallback(
    (pagination, filters, sorter) => {
      const { current: page, pageSize } = pagination;
      setPage(page);
      setPageSize(pageSize);

      const sortBy = getSortedParams(sorter);
      setSortBy(sortBy);

      fetchDataSource({ sortBy, page, pageSize });
    },
    [clients]
  );

  const serverPagination: TablePaginationConfig = {
    pageSize: +pageSize,
    total,
    current: +page,
  };

  return (
    <div>
      <div className={style.header}>
        <ClientsHeader />
      </div>
      <div className={style.container}>
        <Table
          _links={TABLES[0]._links}
          columns={COLUMNS}
          loading={loading}
          pagination={serverPagination}
          onDeleteRow={handleDelete}
          dataSource={clients}
          onSearch={handleSearch}
          onChangeTable={handleChangeTable}
          withSearch
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients, setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
