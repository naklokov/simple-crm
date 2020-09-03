import React from "react";
import {
  ActionProps,
  ColumnProps,
  ColumnType,
} from "../../../constants/interfaces";
import { Delete, Call, Link, View, Email } from "../components";
import { getFormattedText } from "./parser";
import gt from "lodash/gt";
import { HighlightTextWrapper } from "../../../wrappers";
import { getFullUrl } from "../../../utils";

const getRenderProp = (
  columnType: ColumnType,
  searched: string,
  format?: string
) => ({
  render: (text: string, record: any) => {
    const formatted = getFormattedText(text, format, columnType, record);
    return (
      <HighlightTextWrapper
        key={columnType}
        text={formatted}
        searched={searched}
      />
    );
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
    a[columnCode].toLowerCase().localeCompare(b[columnCode].toLowerCase());
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

export const mapAction = (
  id: string,
  text: string,
  action: ActionProps,
  searched: string,
  onDelete?: (id: string) => void,
  onView?: (id: string) => void
) => {
  const fullHref = getFullUrl(action.href, id);
  switch (action.actionType) {
    case "delete":
      return (
        <Delete
          key={id}
          href={fullHref}
          title={action.actionName}
          id={id}
          searched={searched}
          onDelete={onDelete}
        />
      );
    case "view":
      return (
        <View
          key={id}
          title={action.actionName}
          id={id}
          searched={searched}
          onView={onView}
        />
      );
    case "call":
      return <Call key={id} phone={text} searched={searched} />;
    case "email":
      return <Email key={id} mail={text} searched={searched} />;
    case "href":
      return <Link key={id} title={text} href={fullHref} searched={searched} />;
    default:
      return (
        <a key={id} href="/">{`Неизвестное событие ${action.actionType}`}</a>
      );
  }
};

export const getColumn = (
  { columnName, columnCode, sorter, columnType, format }: ColumnProps,
  searched: string
) => {
  return {
    ...getSorter(sorter, columnCode, columnType),
    ...getRenderProp(columnType, searched, format),
    title: columnName,
    key: columnCode,
    dataIndex: columnCode,
  };
};
