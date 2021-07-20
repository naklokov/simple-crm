import React, { useState, useCallback, useMemo } from "react";
import { noop } from "lodash";
import { PaginationProps } from "antd/es/pagination";
import { PaginationConfig } from "antd/lib/pagination";
import {
  ActionProps,
  ColumnProps,
  LinksType,
  RecordType,
} from "../../constants";
import { Table } from ".";
import {
  getFieldSortOrder,
  getFilteredDataSource,
  getSortedParams,
} from "./utils";
import { TableHeader } from "./components";
import { DEFAULT_PAGE_NUMBER } from "./constants";

export interface TableWithClientPagingProps {
  className?: any;
  columns?: ColumnProps[];
  actions?: ActionProps[];
  links: LinksType;
  dataSource: any[];
  actionsPermissions?: string[];
  idValue?: string;
  pagination?: PaginationProps;
  onSaveRow?: (values: any) => void;
  onViewRow?: (id: string) => void;
  onDoneRow?: (id: string) => void;
  onDeleteRow?: (id: string) => void;
  withSearch?: boolean;
  searchPlaceholder?: string;
  extraTitle?: JSX.Element;
}

export const TableWithClientPaging: React.FC<TableWithClientPagingProps> = ({
  className,
  columns = [],
  actions = [],
  links = {},
  dataSource,
  actionsPermissions = [],
  idValue = "id",
  pagination = {
    pageSize: 5,
  },
  onSaveRow = noop,
  onViewRow = noop,
  onDeleteRow = noop,
  onDoneRow = noop,
  extraTitle,
  withSearch,
  searchPlaceholder,
}) => {
  const [searchedAll, setSearchedAll] = useState("");
  const [searchedColumns, setSearchedColumns] = useState<RecordType>({});
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);

  const tableDataSource = useMemo(
    () =>
      searchedAll
        ? getFilteredDataSource(searchedAll, dataSource, columns, idValue)
        : dataSource,
    [dataSource, searchedAll, idValue, columns]
  );

  const handleClearAll = useCallback(() => {
    setSearchedAll("");
  }, []);

  const handleSearchAll = useCallback((searched: string) => {
    setSearchedAll(searched);
  }, []);

  const handleSearchColumn = useCallback(
    (searched: string, confirm: any, column: ColumnProps) => {
      setSearchedColumns({ ...searchedColumns, [column.columnCode]: searched });
      confirm();
    },
    [searchedColumns]
  );

  const handleChangeTable = useCallback(
    (paginationParams: PaginationConfig, tableFilters, sorter) => {
      const sortByNext = getSortedParams(sorter, columns);
      setSortBy(sortByNext);
      setPage(paginationParams.current || DEFAULT_PAGE_NUMBER);

      if (sortByNext !== sortBy) {
        setPage(DEFAULT_PAGE_NUMBER);
      }
    },
    [sortBy, columns]
  );

  const tableHeader = useMemo(
    () =>
      withSearch || extraTitle
        ? () => (
            <TableHeader
              searchPlaceholder={searchPlaceholder}
              onClearAll={handleClearAll}
              onSearch={handleSearchAll}
              withSearch={withSearch}
              extra={extraTitle}
            />
          )
        : undefined,
    [withSearch, extraTitle, handleClearAll, handleSearchAll, searchPlaceholder]
  );

  return (
    <Table
      className={className}
      columns={columns}
      actions={actions}
      links={links}
      pagination={{
        ...pagination,
        current: page,
      }}
      dataSource={tableDataSource}
      onSaveRow={onSaveRow}
      permissions={actionsPermissions}
      searchAll={searchedAll}
      sortOrder={getFieldSortOrder(sortBy)}
      tableHeader={tableHeader}
      onViewRow={onViewRow}
      onDoneRow={onDoneRow}
      onSearchColumn={handleSearchColumn}
      onChangeTable={handleChangeTable}
      searchedColumns={searchedColumns}
      onDeleteRow={onDeleteRow}
    />
  );
};

export default TableWithClientPaging;
