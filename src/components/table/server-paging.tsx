import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { TablePaginationConfig } from "antd/lib/table";
import { Table } from ".";
import {
  ActionProps,
  ClientEntityProps,
  ColumnProps,
  LinksType,
  RecordType,
  RsqlParamProps,
} from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFiteredEntityArray,
  pluralize,
} from "../../utils";
import { getServerPagingRsql, getSortedParams } from "./utils";

const DEFAULT_PAGE_NUMBER = 1;

export interface TableWithServerPagingProps {
  url: string;
  columns?: ColumnProps[];
  actions?: ActionProps[];
  extraHeader?: JSX.Element;
  extraRsqlParams?: RsqlParamProps[];
  withSearch?: boolean;
  bordered?: boolean;
  _links?: LinksType;
}

export const TableWithServerPaging: React.FC<TableWithServerPagingProps> = ({
  columns = [],
  actions = [],
  extraHeader,
  url,
  extraRsqlParams,
  withSearch = true,
  bordered,
  _links,
}) => {
  const [t] = useTranslation("tableServer");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
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
          query: getServerPagingRsql({
            searchedAll,
            searchedColumns,
            columns: columns ?? [],
            extraRsqlParams,
          }),
        },
      });

      setDataSource(response?.data?.rows ?? []);
      setTotal(response?.data?.totalCount ?? 0);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, [page, pageSize, sortBy, searchedAll, searchedColumns, extraRsqlParams]);

  const handleSearch = useCallback((searchAllText: string) => {
    setPage(1);
    setSearchedAll(searchAllText);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.success.delete"));
      setDataSource(getFiteredEntityArray(id, dataSource));
    },
    [dataSource, t]
  );

  const handleChangeTable = useCallback((paginationParams, filters, sorter) => {
    setPage(paginationParams.current || DEFAULT_PAGE_NUMBER);
    setPageSize(paginationParams.pageSize);
    setSortBy(getSortedParams(sorter));
  }, []);

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

  const totalText = pluralize(total, [
    t("total.title.one", { total }),
    t("total.title.some", { total }),
    t("total.title.many", { total }),
  ]);
  const serverPagination: TablePaginationConfig = {
    pageSize,
    current: page,
    total,
    showTotal: () => totalText,
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
    />
  );
};

export default TableWithServerPaging;
