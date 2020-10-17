import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../components";
import {
  ClientEntityProps,
  ColumnProps,
  formConfig,
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

export type TableSearchColumnsType = {
  column: string;
  searched: string;
};

interface PaginationsProps {
  page: number;
  pageSize: number;
  sortBy: string;
  searchedAll: string;
  searchedColumns: TableSearchColumnsType[];
}

const { COLUMNS, TABLES } = formConfig.clients;

interface TableProps {
  extraHeader: JSX.Element;
  userProfileId?: string;
}

export const TablePersonal = ({ extraHeader, userProfileId }: TableProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [pagination, setPagination] = useState<PaginationsProps>({
    page: 1,
    pageSize: 10,
    sortBy: "",
    searchedAll: "",
    searchedColumns: [],
  });
  const [total, setTotal] = useState(0);

  const url = urls.clients.paging;

  const fetchDataSource = async ({
    searchedAll,
    searchedColumns,
    ...params
  }: PaginationsProps) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
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
      fetchDataSource(pagination);
    }
  }, [pagination, userProfileId]);

  const handleSearch = useCallback(
    (searchedAll: string) => {
      const page = 1;
      const updated = { ...pagination, page, searchedAll };
      setPagination(updated);
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
      const { current: page, pageSize } = paginationParams;
      const sortBy = getSortedParams(sorter);

      const updated = { ...pagination, page, pageSize, sortBy };
      setPagination(updated);
    },
    [dataSource]
  );

  const handleSearchColumn = useCallback(
    (searched: string, column: ColumnProps) => {
      const updated = {
        ...pagination,
        searchedColumns: [
          ...pagination.searchedColumns,
          { column: column.columnCode, searched },
        ],
      };
      debugger;

      setPagination(updated);
    },
    [pagination]
  );

  const handleResetFilters = useCallback(
    (column: ColumnProps) => {
      const updatedSearchedColumns = pagination.searchedColumns.find(
        (o) => o.column !== column.c
      );
    },
    [pagination]
  );

  const serverPagination: TablePaginationConfig = {
    pageSize: pagination.pageSize,
    current: pagination.page,
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
      withSearch
    />
  );
};

export default TablePersonal;
