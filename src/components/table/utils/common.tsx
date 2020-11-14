import React from "react";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import noop from "lodash/noop";
import { columns } from "../components";

import {
  ActionProps,
  ColumnProps,
  EntityOwnerProps,
  RecordType,
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
} from "../../../constants";
import { getSorterProp } from "./sorter";
import { getEditableProp } from "./editable";
import { renderActions } from "./actions";
import { getColumnSearchProp } from "./column-search";
import { getRsqlParams } from "../../../utils";

const { Dictionary, Date, Text, Number } = columns;

export const SearchedAllContext = React.createContext("");
export const SearchedColumnsContext = React.createContext<RecordType>({});
export const TableActionsContext = React.createContext({
  onSaveRow: noop,
  onDeleteRow: noop,
  onViewRow: noop,
  onDoneRow: noop,
  onSearchColumn: noop,
  onResetFilter: noop,
});

const getRenderProp = (column: ColumnProps) => ({
  render: (text: string, record: any) => {
    const { format, columnType } = column;

    switch (columnType) {
      case "dictionary":
        return <Dictionary value={text} column={column} />;
      case "date":
        return (
          <Date value={text} format={format} record={record} column={column} />
        );
      case "number":
        return (
          <Number
            value={text}
            format={format}
            record={record}
            column={column}
          />
        );
      default:
        return (
          <Text value={text} format={format} record={record} column={column} />
        );
    }
  },
});

export const getColumn = (
  column: ColumnProps,
  searchedColumns: RecordType,
  permissions: string[] = []
) => {
  const { columnCode, columnName, fixed } = column;

  return {
    key: columnCode,
    title: columnName,
    dataIndex: columnCode,
    fixed,
    ...getSorterProp(column),
    ...getEditableProp(column, permissions),
    ...getColumnSearchProp(column, searchedColumns),
    ...getRenderProp(column),
  };
};

export const getFilteredDataSource = (
  searched: string,
  dataSource: any[],
  columns?: ColumnProps[],
  idField: string = "id"
) => {
  const visibleColumns = dataSource.map((item) => {
    const picked = columns?.map((col) => col.columnCode) ?? [];
    return pick(item, [...picked, idField]);
  });

  const filteredIds = visibleColumns
    .filter((row: Object) =>
      Object.values(row).some((value: string) => {
        return value
          ?.toString()
          ?.toLowerCase()
          ?.includes(searched?.toLowerCase());
      })
    )
    .map((o) => o?.[idField]);

  return dataSource.filter((o) => filteredIds.includes(o?.[idField]));
};

export const getActions = (
  actions: ActionProps[] = [],
  t: (value: string) => string
) => {
  if (isEmpty(actions)) {
    return {};
  }

  return {
    title: t("actions.column.title"),
    key: "actions",
    render: (text: string, entity: EntityOwnerProps) =>
      renderActions(actions, text, entity),
  };
};

export const getDataColumns = (
  columns: ColumnProps[] = [],
  searchedColumns: RecordType,
  permissions?: string[]
) =>
  columns.map(({ columnActions, ...column }) => {
    const columnProps = getColumn(column, searchedColumns, permissions);

    if (!isEmpty(columnActions)) {
      const actions = columnActions || [];
      return {
        ...columnProps,
        render: (text: string, entity: EntityOwnerProps) =>
          renderActions(actions, text, entity, column),
      };
    }

    return columnProps;
  });
