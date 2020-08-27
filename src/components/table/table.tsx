import React, { useState, useEffect, useCallback } from "react";
import { Table as TableUI } from "antd";

import { ColumnProps, ActionProps } from "../../constants/interfaces";
import { useTranslation } from "react-i18next";
import {
  getActions,
  getDataColumns,
  mapWithKey,
  getFilteredDataSource,
} from "./utils";
import { Header } from "./components";
import noop from "lodash/noop";

interface TableProps {
  dataSource: any[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  loading: boolean;
  onDeleteRow?: (id: string) => void;
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
  dataSource,
  actions,
  loading,
  onDeleteRow = noop,
  withSearch = false,
}: TableProps) => {
  const [t] = useTranslation("table");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searched, setSearched] = useState("");

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

  const source = searched ? filteredDataSource : dataSource;

  return (
    <TableUI
      size="middle"
      title={() => <Header onSearch={handleSearch} withSearch={withSearch} />}
      columns={[
        ...getDataColumns(columns, searched),
        getActions(actions, t, searched, onDeleteRow),
      ]}
      dataSource={mapWithKey(source)}
      pagination={false}
      loading={loading}
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

export default Table;
