import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Table } from ".";
import {
  ActionProps,
  ClientEntityProps,
  ColumnProps,
  RecordType,
  RsqlParamProps,
} from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFiteredEntityArray,
  getSortedParams,
} from "../../utils";
import { getQueryString } from "./utils";
import { TablePaginationConfig } from "antd/lib/table";

interface TableWithServerPagingProps {
  url: string;
  columns?: ColumnProps[];
  actions?: ActionProps[];
  extraHeader?: JSX.Element;
  extraRsqlParams?: RsqlParamProps[];
  withSearch?: boolean;
  bordered?: boolean;
  _links?: object;
}

export const TableWithServerPaging = ({
  columns = [],
  actions = [],
  extraHeader,
  url,
  extraRsqlParams,
  withSearch = true,
  bordered,
  _links = {},
}: TableWithServerPagingProps) => {
  const [t] = useTranslation("tableServer");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [searchedAll, setSearchedAll] = useState("");
  const [searchedColumns, setSearchedColumns] = useState<RecordType>({});
  const [total, setTotal] = useState(0);

  const fetchDataSource = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          page,
          pageSize,
          sortBy,
          query: getQueryString({
            searchedAll,
            searchedColumns,
            columns: columns ?? [],
            extraRsqlParams,
          }),
        },
      });

      const { totalCount, rows } = response?.data ?? {};
      setDataSource(rows);
      setTotal(totalCount);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, [page, pageSize, sortBy, searchedAll, searchedColumns, extraRsqlParams]);

  const handleSearch = useCallback(
    (searchedAll: string) => {
      setPage(1);
      setSearchedAll(searchedAll);
    },
    [dataSource]
  );

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setDataSource(getFiteredEntityArray(id, dataSource));
    },
    [dataSource]
  );

  const handleChangeTable = useCallback(
    (paginationParams, filters, sorter) => {
      const { current, pageSize } = paginationParams;
      const sortBy = getSortedParams(sorter);
      setSortBy(sortBy);
      setPage(current);
      setPageSize(pageSize);
    },
    [dataSource]
  );

  const handleSearchColumn = useCallback(
    (searched: string, confirm: any, column: ColumnProps) => {
      const updated = {
        ...searchedColumns,
        [column.columnCode]: searched,
      };

      setSearchedColumns(updated);
      confirm();
    },
    [searchedColumns]
  );

  const handleResetFilter = useCallback(
    (column: ColumnProps, clearFilters: Function) => {
      const updated = {
        ...searchedColumns,
        [column.columnCode]: "",
      };
      setSearchedColumns(updated);
      clearFilters();
    },
    [searchedColumns]
  );

  const handleResetAllFilters = useCallback(() => {
    setSearchedAll("");
    setSearchedColumns({});
  }, []);

  const serverPagination: TablePaginationConfig = {
    pageSize,
    current: page,
    total,
  };

  return (
    <Table
      _links={_links}
      actions={actions}
      columns={columns}
      extraHeader={extraHeader}
      loading={loading}
      pagination={serverPagination}
      onDeleteRow={handleDelete}
      dataSource={dataSource}
      onSearch={handleSearch}
      onChangeTable={handleChangeTable}
      onSearchColumn={handleSearchColumn}
      onResetFilter={handleResetFilter}
      searchAll={searchedAll}
      searchedColumns={searchedColumns}
      onResetAllFilters={handleResetAllFilters}
      bordered={bordered}
      withSearch={withSearch}
      total={{
        title: t("total.title"),
        count: total,
      }}
    />
  );
};

export default TableWithServerPaging;
