import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table as TableUI, Input } from "antd";

import { TableColumnProps, TableActionProps } from "../../constants/interfaces";
import { defaultErrorHandler } from "../../utils";
import { useTranslation } from "react-i18next";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setLoading as setLoadingAction,
  setTableLoading as setTableLoadingAction,
} from "../../__data__";
import { connect } from "react-redux";
import {
  getActions,
  getDataColumns,
  mapWithKey,
  getFilteredDataSource,
} from "./utils";
import { State } from "../../__data__/interfaces";
import { Header } from "./components";

interface TableProps {
  url: string;
  columns?: TableColumnProps[];
  actions?: TableActionProps[];
  tableLoading: boolean;
  setTableLoading: (loading: boolean) => void;
  withSearch?: boolean;
}

/* 
  TODO Чего не хватает таблице
  1. Фильтрация по колонкам (кастомный фильтр длинною в жизнь)
  2. Кнопка |...| доп действий. Что туда писать и надо прикрутить вообще блок кнопок.

  На подумать:
  1. Утащить всю работу с таблицей в redux (передавать name таблицы и спокойно всё коннектить к компоненту)
*/
export const Table = ({
  columns,
  url,
  actions,
  tableLoading,
  setTableLoading,
  withSearch = false,
}: TableProps) => {
  const [t] = useTranslation("table");
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searched, setSearched] = useState("");

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(url);
      const source = mapWithKey(response?.data ?? []);
      setDataSource(source);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, []);

  const handleSearch = useCallback(
    (inputSearch) => {
      setSearched(inputSearch);

      if (inputSearch) {
        const filtered = getFilteredDataSource(
          inputSearch,
          dataSource,
          columns
        );
        setFilteredDataSource(filtered as never[]);
        return;
      }

      setFilteredDataSource([]);
    },
    [dataSource, filteredDataSource, columns]
  );

  const handleDelete = useCallback(
    (deletedId) => {
      const updatedDataSource = dataSource.filter(({ id }) => id !== deletedId);
      setDataSource(updatedDataSource);
    },
    [dataSource]
  );

  return (
    <TableUI
      size="middle"
      title={() => <Header onSearch={handleSearch} withSearch={withSearch} />}
      columns={[
        ...getDataColumns(columns, searched),
        getActions(actions, t, searched, handleDelete),
      ]}
      dataSource={searched ? filteredDataSource : dataSource}
      pagination={false}
      loading={tableLoading}
      locale={{
        filterTitle: t("filter.title"),
        filterConfirm: t("filter.confirm"),
        filterReset: t("filter.reset"),
        filterEmptyText: t("filter.empty"),
        sortTitle: t("sort.title"),
        triggerDesc: t("sort.desc"),
        triggerAsc: t("sort.asc"),
        cancelSort: t("sort.cancel"),
        emptyText: t("empty"),
      }}
    />
  );
};

const mapStateToProps = (state: State) => ({
  tableLoading: state?.app?.tableLoading ?? true,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoading: (loading: boolean) => dispatch(setLoadingAction(loading)),
  setTableLoading: (loading: boolean) =>
    dispatch(setTableLoadingAction(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
