import React, { useState, useEffect, useCallback, Key } from "react";
import { Table as TableUI } from "antd";

import { ColumnProps, ActionProps } from "../../constants/interfaces";
import { useTranslation } from "react-i18next";
import {
  getActions,
  getDataColumns,
  getFilteredDataSource,
  getEditableTableBody,
  fetchDictionaries,
} from "./utils";
import { Header } from "./components";
import noop from "lodash/noop";

import style from "./table.module.scss";
import { setTableLoading } from "../../__data__";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect, useDispatch } from "react-redux";
import { TablePaginationConfig } from "antd/lib/table";

interface TableProps {
  dataSource: any[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  loading?: boolean;
  tableLoading: boolean;
  pagination?: TablePaginationConfig;
  _links?: any;
  onDeleteRow?: (id: string) => void;
  onViewRow?: (id: string) => void;
  onSaveRow?: (record: any) => void;
  onDoneRow?: (record: any) => void;
  onSearch?: (inputSearch: string) => void;
  withSearch?: boolean;
  withTitle?: boolean;
  addButton?: JSX.Element;
  className?: string;
  onChangeTable?: (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => void;
}

export const Table = ({
  _links,
  columns,
  className = style.table,
  dataSource,
  actions,
  loading,
  tableLoading,
  pagination = { pageSize: 10 },
  onDeleteRow = noop,
  onViewRow = noop,
  onSaveRow = noop,
  onDoneRow = noop,
  onSearch,
  withSearch = false,
  withTitle = true,
  addButton,
  onChangeTable = noop,
}: TableProps) => {
  const [t] = useTranslation("table");
  const dispatch = useDispatch();
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searched, setSearched] = useState("");

  // useEffect(() => {
  //   if (_links) {
  //     const { self, ...links } = _links;
  //     fetchDictionaries(links, dispatch);
  //   }
  // }, [_links]);

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

  const title = withTitle
    ? () => (
        <Header
          onSearch={onSearch || handleSearch}
          withSearch={withSearch}
          button={addButton}
        />
      )
    : void 0;

  const source = searched ? filteredDataSource : dataSource;

  return (
    <TableUI
      className={className}
      onChange={onChangeTable}
      size="middle"
      title={title}
      columns={[
        ...getDataColumns(columns, searched, onSaveRow),
        getActions(actions, t, searched, onDeleteRow, onViewRow, onDoneRow),
      ]}
      dataSource={source.map((item) => ({ ...item, key: item.id }))}
      pagination={{ ...pagination, locale: "ru-RU" }}
      components={getEditableTableBody()}
      rowClassName={() => style.editableRow}
      loading={loading || tableLoading}
    />
  );
};

const mapStateToProps = (state: State) => ({
  tableLoading: state?.app?.tableLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Table);
