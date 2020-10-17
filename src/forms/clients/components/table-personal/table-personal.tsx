import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../components";
import {
  ClientEntityProps,
  ColumnProps,
  formConfig,
  TableSearchColumnsType,
  urls,
} from "../../../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFiteredEntityArray,
  getSortedParams,
} from "../../../../utils";
import { getQueryString } from "../../utils";
import { TablePaginationConfig } from "antd/lib/table";

const { COLUMNS, TABLES } = formConfig.clients;

interface TableProps {
  extraHeader: JSX.Element;
  userProfileId?: string;
}

export const TablePersonal = ({ extraHeader, userProfileId }: TableProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [searchedAll, setSearchedAll] = useState("");
  const [searchedColumns, setSearchedColumns] = useState<
    TableSearchColumnsType[]
  >([]);
  const [total, setTotal] = useState(0);

  const url = urls.clients.paging;

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
            userProfileId,
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
    if (userProfileId) {
      fetchDataSource();
    }
  }, [page, pageSize, sortBy, searchedAll, searchedColumns, userProfileId]);

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
    (selectedKeys: string[], confirm: any, column: ColumnProps) => {
      const updatedSearchedColumns: TableSearchColumnsType[] = [
        ...searchedColumns,
        { column: column.columnCode, searched: selectedKeys[0] },
      ];

      setSearchedColumns(updatedSearchedColumns);
      confirm();
    },
    [searchedColumns]
  );

  const handleResetFilters = useCallback(
    (column: ColumnProps, clearFilters: Function) => {
      const updatedSearchedColumns = searchedColumns.filter(
        (o) => o.column !== column.columnCode
      );
      setSearchedColumns(updatedSearchedColumns);
      clearFilters();
    },
    [searchedColumns]
  );

  const serverPagination: TablePaginationConfig = {
    pageSize,
    current: page,
    total,
  };

  return (
    <Table
      _links={TABLES[0]._links}
      columns={COLUMNS}
      extraHeader={extraHeader}
      loading={loading}
      pagination={serverPagination}
      onDeleteRow={handleDelete}
      dataSource={dataSource}
      onSearch={handleSearch}
      onChangeTable={handleChangeTable}
      onSearchColumn={handleSearchColumn}
      onResetFilters={handleResetFilters}
      searchAll={searchedAll}
      searchedColumns={searchedColumns}
      withSearch
    />
  );
};

export default TablePersonal;
