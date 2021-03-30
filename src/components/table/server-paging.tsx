import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { TablePaginationConfig } from "antd/lib/table";
import { PaginationConfig } from "antd/lib/pagination";
import { useDispatch } from "react-redux";
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
  getValueFromRsql,
  pluralize,
} from "../../utils";
import {
  getFetchDataSourceQuery,
  getFilterAllRsqlQuery,
  getFilterColumnRsqlQuery,
  getInitialQueries,
  getSearchedColumnsFromFilters,
  getSortedParams,
  useTableServerPagingParams,
} from "./utils";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import { setTableLoading } from "../../__data__";

const FILTER_ALL_NAME = "all";
const SEARCH_ALL_KEYS = ["phone", "inn", "shortName", "city"];

export interface TableWithServerPagingProps {
  columns?: ColumnProps[];
  actions?: ActionProps[];
  extraHeader?: JSX.Element;
  extraRsqlParams?: RsqlParamProps[];
  withSearch?: boolean;
  _links: LinksType;
}

export const TableWithServerPaging: React.FC<TableWithServerPagingProps> = ({
  columns = [],
  actions = [],
  _links = {},
  extraHeader,
  withSearch = true,
}) => {
  const [url, initialSearch] = _links?.self?.href?.split("?") ?? [];
  const [t] = useTranslation("tableServer");
  const dispatch = useDispatch();
  const [searchedAll, setSearchedAll] = useState("");
  const [searchedColumns, setSearchedColumns] = useState<RecordType>({});

  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [total, setTotal] = useState(0);
  const initialQueries = useMemo(() => getInitialQueries(initialSearch), [
    initialSearch,
  ]);

  const {
    page,
    pageSize,
    sortBy,
    filters,
    setPage,
    setPageSize,
    setFilters,
    setSortBy,
  } = useTableServerPagingParams();

  // пробрасываем значения колонок необходимые для поиска
  useEffect(() => {
    const { [FILTER_ALL_NAME]: all = "", ...columnsFilters } = filters;
    const searchedColumnsParsed = getSearchedColumnsFromFilters(columnsFilters);

    setSearchedColumns(searchedColumnsParsed);
    setSearchedAll(getValueFromRsql(all));
  }, [filters]);

  useEffect(() => {
    const fetchDataSource = async () => {
      dispatch(setTableLoading(true));
      try {
        const response = await axios.get(url, {
          params: {
            page,
            pageSize,
            sortBy,
            query: getFetchDataSourceQuery(filters, initialQueries),
          },
        });

        setDataSource(response?.data?.rows ?? []);
        setTotal(response?.data?.totalCount ?? 0);
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        dispatch(setTableLoading(false));
      }
    };

    fetchDataSource();
  }, [filters, page, pageSize, initialQueries, sortBy, url, dispatch]);

  const handleSearch = useCallback(
    (searchAllText: string) => {
      const filterAllRsql = getFilterAllRsqlQuery(
        searchAllText,
        SEARCH_ALL_KEYS
      );

      setPage(DEFAULT_PAGE_NUMBER);
      setFilters({
        ...filters,
        [FILTER_ALL_NAME]: filterAllRsql,
      });
    },
    [filters, setFilters, setPage]
  );

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.success.delete"));
      setDataSource(getFiteredEntityArray(id, dataSource));
    },
    [dataSource, t]
  );

  const handleChangeTable = useCallback(
    (paginationParams: PaginationConfig, tableFilters, sorter) => {
      setPage(paginationParams.current || DEFAULT_PAGE_NUMBER);
      setPageSize(paginationParams.pageSize || DEFAULT_PAGE_SIZE);
      setSortBy(getSortedParams(sorter));
    },
    [setPage, setPageSize, setSortBy]
  );

  const handleSearchColumn = useCallback(
    (searched: string, confirm: any, column: ColumnProps) => {
      const filterColumnRsql = getFilterColumnRsqlQuery(searched, column);

      setFilters({
        ...filters,
        [column.columnCode]: filterColumnRsql,
      });
      confirm();
    },
    [filters, setFilters]
  );

  const handleResetFilter = useCallback(
    (column: ColumnProps, clearFilters: Function) => {
      setFilters({
        ...filters,
        [column.columnCode]: "",
      });
      clearFilters();
    },
    [filters, setFilters]
  );

  const handleResetAllFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

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
      withSearch={withSearch}
    />
  );
};

export default TableWithServerPaging;
