import React from "react";
import isEmpty from "lodash/isEmpty";
import { Space } from "antd";
import { mapAction } from ".";
import {
  TableActionProps,
  TableColumnProps,
  ActionType,
} from "../../../constants";

interface EntityProps {
  id: string;
  businessId: string;
}

const getBaseProps = ({
  columnDescription,
  columnCode,
  sorter,
}: TableColumnProps) => ({
  title: columnDescription,
  key: columnCode,
  dataIndex: columnCode,
  sorter,
});

const renderAction = (
  actionType: ActionType,
  actionName: string,
  text: string,
  entity: EntityProps,
  href?: string
) => (
  <Space size="middle">
    {mapAction(text, actionType, actionName, href, entity.businessId)}
  </Space>
);

export const getHref = (href: string = "", id?: string): string => {
  if (id) {
    return `${href}/${id}`;
  }

  return href;
};

export const getActions = (
  actions: TableActionProps[] = [],
  t: (value: string) => string
) => {
  if (isEmpty(actions)) {
    return {};
  }

  return {
    title: t("actions.column.title"),
    key: "actions",
    render: (text: string, entity: EntityProps) =>
      actions.map(({ actionType, actionName, href }) =>
        renderAction(actionType, actionName, text, entity, href)
      ),
  };
};

export const getDataColumns = (columns: TableColumnProps[] = []) =>
  columns.map(({ actionType, ...column }) => {
    const base = getBaseProps(column);

    if (actionType) {
      return {
        ...base,
        render: (text: string, entity: EntityProps) =>
          renderAction(actionType, text, text, entity),
      };
    }

    return base;
  });
