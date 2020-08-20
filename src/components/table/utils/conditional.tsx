import React from "react";
import isEmpty from "lodash/isEmpty";
import { Space } from "antd";
import { mapAction } from ".";
import moment from "moment";

import {
  TableActionProps,
  TableColumnProps,
  EntityProps,
  ColumnType,
} from "../../../constants";
import { ComponentPermissionsChecker } from "../../../wrappers";

const formatDate = (text: string, format: string) =>
  moment(text).format(format);

const FORMAT_MAP: {
  [key: string]: (text: string, format: string) => string;
} = {
  date: formatDate,
};

const getFormattedRenderProps = (
  columnType: ColumnType,
  format: string = ""
) => {
  const method = FORMAT_MAP[columnType];
  if (method) {
    return {
      render: (text: string) => <span>{method(text, format)}</span>,
    };
  }

  return {};
};

const getBaseProps = ({
  columnDescription,
  columnCode,
  sorter,
  columnType,
  format,
}: TableColumnProps) => {
  const renderProps = getFormattedRenderProps(columnType, format);

  return {
    title: columnDescription,
    key: columnCode,
    dataIndex: columnCode,
    type: columnType,
    sorter,
    ...renderProps,
  };
};

const renderActions = (
  actions: TableActionProps[],
  text: string,
  entity: EntityProps,
  onDelete?: (id: string) => void
) => (
  <React.Fragment>
    {actions.map((action) => (
      <ComponentPermissionsChecker availablePermissions={action.permissions}>
        <Space size="middle">
          {mapAction(entity.id, text, action, onDelete)}
        </Space>
      </ComponentPermissionsChecker>
    ))}
  </React.Fragment>
);

export const getHref = (href: string = "", id?: string): string => {
  if (id) {
    return `${href}/${id}`;
  }

  return href;
};

export const getActions = (
  actions: TableActionProps[] = [],
  t: (value: string) => string,
  onDelete: (id: string) => void
) => {
  if (isEmpty(actions)) {
    return {};
  }

  return {
    title: t("actions.column.title"),
    key: "actions",
    render: (text: string, entity: EntityProps) =>
      renderActions(actions, text, entity, onDelete),
  };
};

export const getDataColumns = (columns: TableColumnProps[] = []) =>
  columns.map(({ columnActions, ...column }) => {
    const base = getBaseProps(column);

    if (columnActions) {
      const actions = columnActions || [];
      return {
        ...base,
        render: (text: string, entity: EntityProps) =>
          renderActions(actions, text, entity),
      };
    }

    return base;
  });
