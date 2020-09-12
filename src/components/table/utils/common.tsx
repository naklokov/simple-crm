import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import noop from "lodash/noop";

import { ActionProps, ColumnProps, EntityProps } from "../../../constants";
import { HighlightTextWrapper } from "../../../wrappers";
import { getFormattedText } from "./formatters";
import { getSorterProp } from "./sorter";
import { getEditableProp } from "./editable";
import { renderActions } from "./actions";

const getRenderProp = (column: ColumnProps, searched: string) => ({
  render: (text: string, record: any) => {
    const { format, columnType } = column;
    let renderText = text;

    // if (columnType === "dictionary") {
    //   renderText = getDictionaryText(text, column.columnCode, record);
    // }

    if (format) {
      renderText = getFormattedText(text, format, columnType, record);
    }

    return (
      <HighlightTextWrapper
        key={columnType}
        text={renderText}
        searched={searched}
      />
    );
  },
});

export const getColumn = (
  column: ColumnProps,
  searched: string,
  onSaveRow: (record: any) => void
) => {
  const { columnCode, columnName } = column;

  return {
    key: columnCode,
    title: columnName,
    dataIndex: columnCode,
    ...getSorterProp(column),
    ...getEditableProp(column, onSaveRow),
    ...getRenderProp(column, searched),
  };
};

export const getFilteredDataSource = (
  searched: string,
  dataSource: any[],
  columns?: ColumnProps[]
) => {
  const visibleColumns = dataSource.map((item) => {
    const picked = columns?.map((col) => col.columnCode) ?? [];
    return pick(item, picked);
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
  t: (value: string) => string,
  searched: string,
  onDelete: (id: string) => void,
  onView: (id: string) => void
) => {
  if (isEmpty(actions)) {
    return {};
  }

  return {
    title: t("actions.column.title"),
    key: "actions",
    render: (text: string, entity: EntityProps) =>
      renderActions(actions, text, entity, searched, onDelete, onView),
  };
};

export const getDataColumns = (
  columns: ColumnProps[] = [],
  searched: string,
  onSaveRow: (record: any) => void = noop
) =>
  columns.map(({ columnActions, ...column }) => {
    // TODO получение всех необходимых словарей перед отрисовкой, т.к. render не поддерживает асинхронщину
    const columnProps = getColumn(column, searched, onSaveRow);

    if (!isEmpty(columnActions)) {
      const actions = columnActions || [];
      return {
        ...columnProps,
        render: (text: string, entity: EntityProps) =>
          renderActions(actions, text, entity, searched),
      };
    }

    return columnProps;
  });

export const getTableLocale = (t: Function) => ({
  filterTitle: t("filter.title"),
  filterConfirm: t("filter.confirm"),
  filterReset: t("filter.reset"),
  filterEmptyText: t("filter.empty"),
  sortTitle: t("sort.title"),
  triggerDesc: t("sort.desc"),
  triggerAsc: t("sort.asc"),
  cancelSort: t("sort.cancel"),
  emptyText: t("empty"),
});
