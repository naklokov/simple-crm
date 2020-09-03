import React, { useState, useEffect, useCallback } from "react";
import { Table as TableUI } from "antd";

import { ColumnProps, ActionProps } from "../../constants/interfaces";
import { useTranslation } from "react-i18next";
import { getActions, getDataColumns, getFilteredDataSource } from "./utils";
import { Header } from "./components";
import noop from "lodash/noop";

interface TableProps {
  pageCount?: number;
  dataSource: any[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  loading: boolean;
  onDeleteRow?: (id: string) => void;
  onViewRow?: (id: string) => void;
  withSearch?: boolean;
  addButton?: JSX.Element;
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
  pageCount = 10,
  dataSource,
  actions,
  loading,
  onDeleteRow = noop,
  onViewRow = noop,
  withSearch = false,
  addButton,
}: TableProps) => {
  const [t] = useTranslation("table");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searched, setSearched] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePage = useCallback((page) => {
    setPageNumber(page);
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

      setPageNumber(1);
      setFilteredDataSource([]);
    },
    [dataSource, filteredDataSource, columns]
  );

  const source = searched ? filteredDataSource : dataSource;

  return (
    <TableUI
      size="middle"
      title={() => (
        <Header
          onSearch={handleSearch}
          withSearch={withSearch}
          button={addButton}
        />
      )}
      columns={[
        ...getDataColumns(columns, searched),
        getActions(actions, t, searched, onDeleteRow, onViewRow),
      ]}
      dataSource={source.map((item) => ({ ...item, key: item.id }))}
      pagination={{
        defaultPageSize: pageCount,
        onChange: handleChangePage,
        current: pageNumber,
      }}
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
