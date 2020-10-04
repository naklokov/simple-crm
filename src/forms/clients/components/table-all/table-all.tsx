import React, { ReactNode, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../components";
import { ClientEntityProps, formConfig, urls } from "../../../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFiteredEntityArray,
  getSortedParams,
} from "../../../../utils";
import { getQueryString } from "../../utils";
import { TablePaginationConfig } from "antd/lib/table";

interface PaginationsProps {
  page: number;
  pageSize: number;
  sortBy: string;
  searched: string;
}

const { COLUMNS, TABLES } = formConfig.clients;

interface TableAllProps {
  extraHeader: JSX.Element;
  userProfileId?: string;
}

export const TableAll = ({ extraHeader, userProfileId }: TableAllProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ClientEntityProps[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    sortBy: "",
    searched: "",
  });
  const [total, setTotal] = useState(0);

  const url = urls.clients.paging;

  const fetchDataSource = async ({ searched, ...params }: PaginationsProps) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
          query: getQueryString(searched),
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
    (searched: string) => {
      const page = 1;
      const updated = { ...pagination, page, searched };
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
      withSearch
    />
  );
};

export default TableAll;
