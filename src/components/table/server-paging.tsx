import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { PaginationConfig } from "antd/lib/pagination";
import { useDispatch } from "react-redux";
import {
  TablePaginationConfig,
  TableRowSelection,
} from "antd/lib/table/interface";
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
  getDefaultSort,
  getFetchDataSourceQuery,
  getFilterAllRsqlQuery,
  getFilterColumnRsqlQuery,
  getInitialQueries,
  getSearchedColumnsFromFilters,
  getSortedParams,
  useTableServerPagingParams,
} from "./utils";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  FILTER_ALL_NAME,
} from "./constants";
import { setTableLoading } from "../../__data__";
import { TableHeader } from "./components";

const SEARCH_ALL_KEYS = ["phone", "inn", "shortName", "city"];

export interface TableWithServerPagingProps {
  columns?: ColumnProps[];
  actions?: ActionProps[];
  links: LinksType;
  extraTitle?: JSX.Element;
  extraRsqlParams?: RsqlParamProps[];
  withSearch?: boolean;
  rowSelection?: TableRowSelection<any>;
  footer?: ReactNode;
  searchPlaceholder?: string;
  getTotal?: (total: number) => string;
  reloadKey?: string;
  defaultPageSize?: number;
}

export const TableWithServerPaging: React.FC<TableWithServerPagingProps> = ({
  columns = [],
  actions = [],
  links = {},
  extraTitle,
  withSearch,
  rowSelection,
  footer,
  searchPlaceholder,
  getTotal,
  reloadKey = "",
  defaultPageSize,
}) => {
  const [url, initialSearch] = links?.self?.href?.split("?") ?? [];
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
  } = useTableServerPagingParams(defaultPageSize);

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
  }, [
    filters,
    page,
    pageSize,
    initialQueries,
    sortBy,
    url,
    dispatch,
    reloadKey,
  ]);

  const handleSearchAll = useCallback(
    (inputSearchedAll: string) => {
      const filterAllRsql = getFilterAllRsqlQuery(
        inputSearchedAll,
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
      const updatedFilters = {
        ...filters,
        [column.columnCode]: filterColumnRsql,
      };

      setFilters(updatedFilters);
      confirm();
    },
    [filters, setFilters]
  );

  const handleResetFilter = useCallback(
    (column: ColumnProps, clearFilters: Function) => {
      const updatedFilters = {
        ...filters,
        [column.columnCode]: "",
      };

      setFilters(updatedFilters);
      clearFilters();
    },
    [filters, setFilters]
  );

  const handleClearAll = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const defaultTotal = pluralize(total, [
    t("total.title.one", { total }),
    t("total.title.some", { total }),
    t("total.title.many", { total }),
  ]);

  const serverPagination: TablePaginationConfig = {
    pageSize,
    current: page,
    total,
    showTotal: () => getTotal?.(total) || defaultTotal,
  };

  const tableHeader = useMemo(
    () =>
      withSearch || extraTitle
        ? () => (
            <TableHeader
              onClearAll={handleClearAll}
              onSearch={handleSearchAll}
              searchPlaceholder={searchPlaceholder}
              withSearch={withSearch}
              extra={extraTitle}
            />
          )
        : undefined,
    [withSearch, extraTitle, handleClearAll, handleSearchAll, searchPlaceholder]
  );

  return (
    <Table
      links={links}
      actions={actions}
      columns={columns}
      tableHeader={tableHeader}
      pagination={serverPagination}
      onDeleteRow={handleDelete}
      defaultSort={getDefaultSort(sortBy)}
      dataSource={dataSource}
      onChangeTable={handleChangeTable}
      onSearchColumn={handleSearchColumn}
      onResetFilter={handleResetFilter}
      searchAll={searchedAll}
      searchedColumns={searchedColumns}
      rowSelection={rowSelection}
      footer={footer}
    />
  );
};

export default TableWithServerPaging;
