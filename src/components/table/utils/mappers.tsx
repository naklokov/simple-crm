import React from "react";
import {
  TableActionProps,
  EntityProps,
  TableColumnProps,
  ColumnType,
} from "../../../constants/interfaces";
import { Delete, Call, Link } from "../components";
import { getFormattedText } from "./parser";
import gt from "lodash/gt";
import { HighlightTextWrapper } from "../../../wrappers";
import { getFullUrl } from "../../../utils";

const getRenderProp = (
  columnType: ColumnType,
  searched: string,
  format?: string
) => ({
  render: (text: string) => {
    const formatted = getFormattedText(text, format, columnType);
    return <HighlightTextWrapper text={formatted} searched={searched} />;
  },
});

const getSortFunction = (
  columnCode: string,
  columnType: ColumnType
): ((a: any, b: any) => any) => {
  if (columnType === "number") {
    return (a: any, b: any) => gt(a[columnCode], b[columnCode]);
  }

  return (a: any, b: any) =>
    gt(a[columnCode].toLowerCase(), b[columnCode].toLowerCase());
};

const getSorter = (
  sorter: boolean,
  columnCode: string,
  columnType: ColumnType
) => {
  if (sorter) {
    return { sorter: getSortFunction(columnCode, columnType) };
  }

  return {};
};

export const mapWithKey = (dataSource?: EntityProps[]): any =>
  dataSource?.map((item: EntityProps) => ({ key: item.id, ...item })) ?? [];

export const mapAction = (
  id: string,
  text: string,
  action: TableActionProps,
  searched: string,
  onDelete?: (id: string) => void
) => {
  const fullHref = getFullUrl(action.href, id);
  switch (action.actionType) {
    case "delete":
      return (
        <Delete
          href={fullHref}
          title={action.actionName}
          id={id}
          searched={searched}
          onDelete={onDelete}
        />
      );
    case "call":
      return <Call phone={text} searched={searched} />;
    case "href":
      return <Link title={text} href={fullHref} searched={searched} />;
    default:
      return <a href="/">{`Неизвестное событие ${action.actionType}`}</a>;
  }
};

export const mapColumn = (
  {
    columnDescription,
    columnCode,
    sorter,
    columnType,
    format,
  }: TableColumnProps,
  searched: string
) => {
  return {
    ...getSorter(sorter, columnCode, columnType),
    ...getRenderProp(columnType, searched, format),
    title: columnDescription,
    key: columnCode,
    dataIndex: columnCode,
  };
};
