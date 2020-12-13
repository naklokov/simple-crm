import React, { useState, useCallback } from "react";
import { TabProps } from "../../constants";
import { Table } from ".";
import { getFilteredDataSource } from "./utils";
import { noop } from "lodash";
import { PaginationProps } from "antd/es/pagination";

interface TableWithClientPagingProps {
  table: TabProps;
  dataSource: any[];
  actionsPermissions: string[];
  idValue?: string;
  loading?: boolean;
  extraHeader?: JSX.Element;
  pagination?: PaginationProps;
  onSaveRow?: (values: any) => void;
  onViewRow?: (id: string) => void;
  onDoneRow?: (id: string) => void;
  onDeleteRow?: (id: string) => void;
  withSearch?: boolean;
  className?: any;
}

export const TableWithClientPaging = ({
  table,
  dataSource,
  actionsPermissions = [],
  extraHeader,
  loading,
  idValue = "id",
  pagination = {
    pageSize: 5,
  },
  onSaveRow = noop,
  onViewRow = noop,
  onDeleteRow = noop,
  onDoneRow = noop,
  className,
  withSearch = false,
}: TableWithClientPagingProps) => {
  const [searchedAll, setSearchedAll] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState<any[]>([]);

  const handleSearch = useCallback(
    (searched: string) => {
      setSearchedAll(searched);
      if (searched) {
        const filtered = getFilteredDataSource(
          searched,
          dataSource,
          table?.columns ?? [],
          idValue
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
      className={className}
      onSearch={handleSearch}
      columns={table?.columns ?? []}
      actions={table?.actions ?? []}
      _links={table?._links ?? {}}
      loading={loading}
      extraHeader={extraHeader}
      pagination={pagination}
      dataSource={searchedAll ? filteredDataSource : dataSource}
      onSaveRow={onSaveRow}
      permissions={actionsPermissions}
      searchAll={searchedAll}
      onResetAllFilters={handleResetAllFilters}
      withSearch={withSearch}
      onViewRow={onViewRow}
      onDoneRow={onDoneRow}
      onDeleteRow={onDeleteRow}
    />
  );
};

export default TableWithClientPaging;
