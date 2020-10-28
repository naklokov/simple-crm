import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TableProps } from "../../constants";
import { Table } from ".";
import {
  defaultErrorHandler,
  getUpdatedEntityArray,
  useFetch,
  getFullUrl,
  defaultSuccessHandler,
} from "../../utils";
import { setTableLoading } from "../../__data__";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getFilteredDataSource } from "./utils";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

interface TableWithClientPagingProps {
  table: TableProps;
  url: string;
  fetchParams: object;
  idValue: string;
  actionsPermissions: string[];
  extraHeader?: JSX.Element;
  setTableLoading: (loading: boolean) => void;
}

export const TableWithClientPaging = ({
  table,
  url,
  actionsPermissions = [],
  fetchParams = {},
  extraHeader,
  idValue = "id",
}: TableWithClientPagingProps) => {
  const [t] = useTranslation("tableClients");
  const [searchedAll, setSearchedAll] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const { response, loading } = useFetch({
    url,
    params: fetchParams,
  });

  useEffect(() => {
    setDataSource(response?.data ?? []);
  }, [response]);

  const handleSaveRow = useCallback(
    async (values: any) => {
      const fullUrl = getFullUrl(url, values[idValue]);
      setTableLoading(true);
      try {
        await axios({
          url: fullUrl,
          method: "put",
          data: values,
          params: fetchParams,
        });
        defaultSuccessHandler(t("message.row.save.success"));
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setTableLoading(false);
      }

      setDataSource(getUpdatedEntityArray(values, dataSource, idValue));
    },
    [dataSource, fetchParams, setTableLoading, t]
  );

  const handleSearch = useCallback(
    (searched: string) => {
      setSearchedAll(searched);
      if (searched) {
        const filtered = getFilteredDataSource(
          searched,
          dataSource,
          table?.columns ?? [],
          "itemId"
        );
        setFilteredDataSource(filtered);
      } else {
        setFilteredDataSource([]);
      }
    },
    [filteredDataSource, dataSource]
  );

  const handleResetAllFilters = useCallback(() => {
    setSearchedAll("");
  }, []);

  return (
    <Table
      onSearch={handleSearch}
      columns={table?.columns ?? []}
      actions={table?.tableActions ?? []}
      loading={loading}
      extraHeader={extraHeader}
      pagination={{ pageSize: 5 }}
      dataSource={searchedAll ? filteredDataSource : dataSource}
      onSaveRow={handleSaveRow}
      permissions={actionsPermissions}
      searchAll={searchedAll}
      onResetAllFilters={handleResetAllFilters}
      withSearch
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(null, mapDispatchToProps)(TableWithClientPaging);
