import React, { useState, useEffect, useCallback } from "react";
import { Table as TableUI } from "antd";

import {
  ColumnProps,
  ActionProps,
  TableSearchColumnsType,
} from "../../constants/interfaces";
import { useTranslation } from "react-i18next";
import {
  getActions,
  getDataColumns,
  getFilteredDataSource,
  getEditableTableBody,
  fetchDictionaries,
  SearchedAllContext,
  SearchedColumnsContext,
  TableActionsContext,
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
  onSearchColumn?: (
    selectedKeys: string[],
    confirm: any,
    column: ColumnProps
  ) => void;
  onResetFilters?: (column: ColumnProps, clearFilters: Function) => void;
  withSearch?: boolean;
  withTitle?: boolean;
  extraHeader?: JSX.Element;
  className?: string;
  permissions?: string[];
  onChangeTable?: (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => void;
  searchAll?: string;
  searchedColumns?: TableSearchColumnsType[];
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
  onSearchColumn = noop,
  onResetFilters = noop,
  onSearch,
  withSearch = false,
  withTitle = true,
  extraHeader,
  onChangeTable = noop,
  permissions = [],
  searchAll = "",
  searchedColumns = [],
}: TableProps) => {
  const [t] = useTranslation("table");
  const dispatch = useDispatch();
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchedClient, setSearchedClient] = useState("");

  useEffect(() => {
    if (_links) {
      const { self, ...links } = _links;
      fetchDictionaries(links, dispatch);
    }
  }, [_links]);

  const clientSearch = (value: string) => {
    if (value) {
      const filtered = getFilteredDataSource(value, dataSource, columns);
      setFilteredDataSource(filtered as never[]);
      return;
    }

    setFilteredDataSource([]);
  };

  const handleSearch = useCallback(
    (inputSearch) => {
      setSearchedClient(inputSearch);
      clientSearch(inputSearch);
    },
    [dataSource, filteredDataSource, columns, onSearch]
  );

  const title = withTitle
    ? () => (
        <Header
          withSearch={withSearch}
          onSearch={onSearch || handleSearch}
          extra={extraHeader}
        />
      )
    : void 0;

  const source = searchedClient ? filteredDataSource : dataSource;

  return (
    <SearchedAllContext.Provider value={searchAll || searchedClient}>
      <SearchedColumnsContext.Provider value={searchedColumns}>
        <TableActionsContext.Provider
          value={{
            onSaveRow,
            onDeleteRow,
            onViewRow,
            onDoneRow,
            onSearchColumn,
            onResetFilters,
          }}
        >
          <TableUI
            className={className}
            onChange={onChangeTable}
            size="middle"
            title={title}
            columns={[
              ...getDataColumns(columns, permissions),
              getActions(actions, t),
            ]}
            dataSource={source.map((item) => ({ ...item, key: item.id }))}
            pagination={{ ...pagination }}
            components={getEditableTableBody()}
            rowClassName={() => style.editableRow}
            loading={loading || tableLoading}
          />
        </TableActionsContext.Provider>
      </SearchedColumnsContext.Provider>
    </SearchedAllContext.Provider>
  );
};

const mapStateToProps = (state: State) => ({
  tableLoading: state?.app?.tableLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Table);
