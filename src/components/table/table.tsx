import React, { useState, useEffect, useCallback } from "react";
import { Table as TableUI } from "antd";

import { ColumnProps, ActionProps } from "../../constants/interfaces";
import { useTranslation } from "react-i18next";
import {
  getActions,
  getDataColumns,
  getFilteredDataSource,
  getEditableTableBody,
  getTableLocale,
} from "./utils";
import { Header } from "./components";
import noop from "lodash/noop";

import style from "./table.module.scss";
import { setTableLoading } from "../../__data__";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { TablePaginationConfig } from "antd/lib/table";

interface TableProps {
  dataSource: any[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  loading?: boolean;
  tableLoading: boolean;
  pagination?: TablePaginationConfig;
  onDeleteRow?: (id: string) => void;
  onViewRow?: (id: string) => void;
  onSaveRow?: (record: any) => void;
  withSearch?: boolean;
  withTitle?: boolean;
  addButton?: JSX.Element;
}

export const Table = ({
  columns,
  dataSource,
  actions,
  loading,
  tableLoading,
  pagination = { pageSize: 10 },
  onDeleteRow = noop,
  onViewRow = noop,
  onSaveRow = noop,
  withSearch = false,
  withTitle = true,
  addButton,
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

  const title = withTitle
    ? () => (
        <Header
          onSearch={handleSearch}
          withSearch={withSearch}
          button={addButton}
        />
      )
    : void 0;

  const source = searched ? filteredDataSource : dataSource;

  return (
    <TableUI
      className={style.table}
      size="middle"
      title={title}
      columns={[
        ...getDataColumns(columns, searched, onSaveRow),
        getActions(actions, t, searched, onDeleteRow, onViewRow),
      ]}
      dataSource={source.map((item) => ({ ...item, key: item.id }))}
      pagination={pagination}
      components={getEditableTableBody()}
      rowClassName={() => style.editableRow}
      loading={loading || tableLoading}
      locale={getTableLocale(t)}
    />
  );
};

const mapStateToProps = (state: State) => ({
  tableLoading: state?.app?.tableLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Table);
