import React, { useState, useCallback, useMemo } from "react";
import { noop } from "lodash";
import { PaginationProps } from "antd/es/pagination";
import { ColumnProps, RecordType, TabProps } from "../../constants";
import { Table } from ".";
import { getFilteredDataSource } from "./utils";
import { TableHeader } from "./components";

export interface TableWithClientPagingProps {
  className?: any;
  table: TabProps;
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
  table,
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

  const tableDataSource = useMemo(
    () =>
      searchedAll
        ? getFilteredDataSource(
            searchedAll,
            dataSource,
            table?.columns ?? [],
            idValue
          )
        : dataSource,
    [dataSource, searchedAll, idValue, table?.columns]
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
      columns={table?.columns ?? []}
      actions={table?.actions ?? []}
      links={table?._links ?? {}}
      pagination={pagination}
      dataSource={tableDataSource}
      onSaveRow={onSaveRow}
      permissions={actionsPermissions}
      searchAll={searchedAll}
      tableHeader={tableHeader}
      onViewRow={onViewRow}
      onDoneRow={onDoneRow}
      onSearchColumn={handleSearchColumn}
      searchedColumns={searchedColumns}
      onDeleteRow={onDeleteRow}
    />
  );
};

export default TableWithClientPaging;
