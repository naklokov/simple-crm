import { Rule } from "antd/lib/form";
import React, { ReactNode } from "react";
import { LinksType } from "./entities";

// Типы

export type TabType = "container" | "table" | "custom";

export type FieldFormatType = "textarea" | string;

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "dictionary"
  | "entity"
  | "entity-lazy"
  | "email"
  | "href"
  | "phone"
  | "switch";

export type RecordType = { [key: string]: string };

export type ActionType = "href" | "delete" | "call" | "email" | "view" | "done";

export type ColumnType =
  | "string"
  | "date"
  | "dateRange"
  | "number"
  | "dictionary"
  | "entity"
  | "boolean";

export interface SpanProps {
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

export type FullCalendarDateType = "DD.MM.YYYY";
export type FullCalendarDateTimeType = "DD.MM.YYYY HH:mm";
export type ColumnFormatType =
  | "currency"
  | FullCalendarDateType
  | FullCalendarDateTimeType;

export type TabPositionType = "lower" | "upper" | undefined;

export type FixedPositionType = "left" | "right";

export type TableType = "server" | "client";

// Интерфейсы
export interface DrawerProps {
  code: string;
  name: string;
  description: string;
  fields: FieldProps[];
}

export interface FormProps {
  tab: TabProps;
  drawers: DrawerProps[];
}

export interface DrawerFormProps {
  title: string;
  fields: FieldProps[];
  visible: boolean;
  onClose: <T>(values: T) => void;
}

export interface TabProps {
  tabCode: string;
  tabName: string;
  tabDescription: string;
  type: TabType;
  tableType?: TableType;
  searchPlaceholder?: string;
  withSearch?: boolean;
  fields?: FieldProps[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  _links: LinksType;
}

export interface TableProps {
  tableName: string;
  tableDescription: string;
  tableCode: string;
  columns: ColumnProps[];
  actions: ActionProps[];
  _links: object;
}

export type TableSearchColumnsType = {
  column: string;
  searched: string;
};

export interface ColumnProps {
  align?: "left" | "right" | "center";
  columnName: string;
  columnDescription?: string;
  columnCode: string;
  columnType: ColumnType;
  titleField?: string;
  valueField?: string;
  format?: ColumnFormatType;
  ellipsis?: boolean;
  width?: string;
  fixed?: FixedPositionType;
  sorter?: boolean;
  sortInverse?: boolean;
  filterable?: boolean;
  editable?: boolean;
  // до первого запроса
  isJsonField?: boolean;
  columnActions?: ActionProps[];
  customCode?: string;
}

export interface ActionProps {
  actionName: string;
  actionDescription?: string;
  actionCode?: string;
  actionType: ActionType;
  href?: string;
  permissions: string[];
}

export interface FieldProps {
  fieldCode: string;
  fieldName: string;
  titleField?: string;
  codeField?: string;
  fieldDescription?: string;
  type: FieldType;
  readonly?: boolean;
  disabled?: boolean;
  rules?: Rule[];
  withSelectBefore?: boolean;
  format?: FieldFormatType;
  span?: SpanProps;
  rows?: number;
  permissions: string[];
  placeholder?: string;
  pageSize?: number;
  _links?: LinksType;
}

export interface TabPaneFormProps {
  tab: TabProps;
  formName?: string;
}

export type MethodType = "get" | "post" | "put" | "delete";

export interface RsqlParamProps {
  key: string;
  operator?: string;
  value: string | number | boolean;
}

export interface QueryProps {
  id: "new" | string;
}

export interface RuleProps {
  required?: boolean;
  type?: string;
  value?: string | number;
  message?: string;
  max?: number;
  min?: number;
}

export interface MenuItemProps {
  id: string;
  title: string;
  type: "link" | "drawer";
  permissions: string[];
  icon?: ReactNode;
  url?: string;
  subIcon?: ReactNode;
}
