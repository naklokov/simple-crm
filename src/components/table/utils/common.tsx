import React from "react";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import { columns as tableColumns } from "../components";

import {
  ActionProps,
  ActionType,
  ColumnProps,
  EntityOwnerProps,
  RecordType,
} from "../../../constants";
import { getSorterProp } from "./sorter";
import { getEditableProp } from "./editable";
import { renderActions } from "./actions";
import { getColumnSearchProp } from "./column-search";
import { SortColumnOrderProps } from "../constants";

/**
 * Метод получения свойства свойства отрисовки колонки в таблице
 * @param column Описание полей в колонке
 * @returns получение метода render для колонки
 */
const getRenderProp = (column: ColumnProps) => ({
  render: (text: string, record: any) => {
    const { Entity, Date, Text, Number, Dictionary, Activity } = tableColumns;
    const { format, columnType, customCode } = column;

    // custom поля
    switch (customCode) {
      case "activity":
        return <Activity column={column} record={record} />;
    }

    // обычные поля
    switch (columnType) {
      case "entity":
        return <Entity value={text} column={column} />;
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

export const checkColumnActionType = (
  column: ColumnProps,
  actionType: ActionType
) =>
  column.columnActions?.some((o: ActionProps) => o.actionType === actionType);

export const replaceLikeChars = (value?: string) =>
  value?.replace(/%/g, "") ?? "";

export const getColumn = (
  column: ColumnProps,
  searchedColumns: RecordType,
  withLocalSort: boolean,
  sortColumnOrder?: SortColumnOrderProps,
  permissions: string[] = []
) => {
  const {
    columnCode,
    columnName,
    fixed,
    ellipsis,
    width,
    align = "left",
  } = column;

  return {
    key: columnCode,
    title: columnName,
    dataIndex: columnCode,
    align,
    fixed,
    width,
    ellipsis,
    ...getSorterProp(withLocalSort, column, sortColumnOrder),
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
    .filter((row: { [key: string]: string }) =>
      Object.values(row).some(
        (value: string) =>
          row[idField] !== value &&
          value
            ?.toString()
            ?.toLowerCase()
            ?.includes(searched?.toLowerCase() ?? "")
      )
    )
    .map((o) => o?.[idField]);

  return dataSource.filter((o) => filteredIds.includes(o?.[idField]));
};

export const getActions = (
  actions: ActionProps[] = [],
  t: (value: string) => string
): any => {
  if (isEmpty(actions)) {
    return [];
  }

  return [
    {
      width: 300,
      title: t("actions.column.title"),
      key: "actions",
      render: (text: string, entity: EntityOwnerProps) =>
        renderActions(actions, text, entity),
    },
  ];
};

export const getDataColumns = (
  columns: ColumnProps[] = [],
  searchedColumns: RecordType,
  withLocalSort: boolean,
  sortColumnOrder?: SortColumnOrderProps,
  permissions?: string[]
) =>
  columns.map((column) => {
    const columnProps = getColumn(
      column,
      searchedColumns,
      withLocalSort,
      sortColumnOrder,
      permissions
    );

    if (!isEmpty(column.columnActions)) {
      const actions = column.columnActions || [];
      return {
        ...columnProps,
        render: (text: string, entity: EntityOwnerProps) =>
          renderActions(actions, text, entity, column),
      };
    }

    return columnProps;
  });
