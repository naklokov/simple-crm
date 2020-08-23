import React from "react";
import isEmpty from "lodash/isEmpty";
import { Space } from "antd";
import { mapAction, mapColumn } from ".";

import { ActionProps, ColumnProps, EntityProps } from "../../../constants";
import { ComponentPermissionsChecker } from "../../../wrappers";
import pick from "lodash/pick";

const renderActions = (
  actions: ActionProps[],
  text: string,
  entity: EntityProps,
  searched: string,
  onDelete?: (id: string) => void
) => (
  <React.Fragment>
    {actions.map((action) => (
      <ComponentPermissionsChecker availablePermissions={action.permissions}>
        <Space size="middle">
          {mapAction(entity.id, text, action, searched, onDelete)}
        </Space>
      </ComponentPermissionsChecker>
    ))}
  </React.Fragment>
);

export const getFilteredDataSource = (
  searched: string,
  dataSource: any[],
  columns?: ColumnProps[]
) => {
  const visibleColumns = dataSource.map((item) => {
    const pickColumn = columns?.map((col) => col.columnCode) ?? [];
    return pick(item, pickColumn);
  });

  return visibleColumns.filter((row: Object) =>
    Object.values(row).some((value: string) => {
      return value.toString().includes(searched);
    })
  );
};

export const getActions = (
  actions: ActionProps[] = [],
  t: (value: string) => string,
  searched: string,
  onDelete: (id: string) => void
) => {
  if (isEmpty(actions)) {
    return {};
  }

  return {
    title: t("actions.column.title"),
    key: "actions",
    render: (text: string, entity: EntityProps) =>
      renderActions(actions, text, entity, searched, onDelete),
  };
};

export const getDataColumns = (columns: ColumnProps[] = [], searched: string) =>
  columns.map(({ columnActions, ...column }) => {
    const columnProps = mapColumn(column, searched);

    if (columnActions) {
      const actions = columnActions || [];
      return {
        ...columnProps,
        render: (text: string, entity: EntityProps) =>
          renderActions(actions, text, entity, searched),
      };
    }

    return columnProps;
  });
