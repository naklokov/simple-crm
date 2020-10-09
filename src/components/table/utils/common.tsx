import React from "react";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import noop from "lodash/noop";
import { columns } from "../components";

import { ActionProps, ColumnProps, EntityProps } from "../../../constants";
import { getSorterProp } from "./sorter";
import { getEditableProp } from "./editable";
import { renderActions } from "./actions";

const { Dictionary, Date, Text, Number } = columns;

export const SearchedContext = React.createContext("");
export const TableActionsContext = React.createContext({
  onSaveRow: noop,
  onDeleteRow: noop,
  onViewRow: noop,
  onDoneRow: noop,
});

const getRenderProp = (column: ColumnProps) => ({
  render: (text: string, record: any) => {
    const { format, columnType } = column;

    switch (columnType) {
      case "dictionary":
        return <Dictionary value={text} column={column} />;
      case "date":
        return <Date value={text} format={format} record={record} />;
      case "number":
        return <Number value={text} format={format} record={record} />;
      default:
        return <Text value={text} format={format} record={record} />;
    }
  },
});

export const getColumn = (column: ColumnProps, permissions: string[] = []) => {
  const { columnCode, columnName } = column;

  return {
    key: columnCode,
    title: columnName,
    dataIndex: columnCode,
    ...getSorterProp(column),
    ...getEditableProp(column, permissions),
    ...getRenderProp(column),
  };
};

export const getFilteredDataSource = (
  searched: string,
  dataSource: any[],
  columns?: ColumnProps[]
) => {
  const visibleColumns = dataSource.map((item) => {
    const picked = columns?.map((col) => col.columnCode) ?? [];
    return pick(item, [...picked, "id"]);
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
    .map((o) => o.id);

  return dataSource.filter((o) => filteredIds.includes(o?.id));
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
    render: (text: string, entity: EntityProps) =>
      renderActions(actions, text, entity),
  };
};

export const getDataColumns = (
  columns: ColumnProps[] = [],
  permissions?: string[]
) =>
  columns.map(({ columnActions, ...column }) => {
    // TODO получение всех необходимых словарей перед отрисовкой, т.к. render не поддерживает асинхронщину
    const columnProps = getColumn(column, permissions);

    if (!isEmpty(columnActions)) {
      const actions = columnActions || [];
      return {
        ...columnProps,
        render: (text: string, entity: EntityProps) =>
          renderActions(actions, text, entity),
      };
    }

    return columnProps;
  });

export const getLinks = (dataSource: any[]) => {
  const { self, ...links } = dataSource[0]?._links ?? {};
  return links;
};
