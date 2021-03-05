import { Rule } from "antd/lib/form";
import { RSQL_OPERATORS_MAP } from "../common";

// Типы

type LinksType = {
  self: {
    href: string;
  };
};

export type TabType = "container" | "table" | "custom";

export type FieldFormatType = "textarea" | string;

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "dictionary"
  | "entity"
  // TODO убрать после первого запроса (первый запрос)
  | "entity-personal"
  | "email"
  | "href"
  | "phone";

export type RecordType = { [key: string]: string };

export type FilterOperatorType = "equal" | "rsql";

export type ActionType = "href" | "delete" | "call" | "email" | "view" | "done";

export type ColumnType =
  | "string"
  | "date"
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

// Интерфейсы

export interface DrawerProps {
  code: string;
  name: string;
  description: string;
  fields: FieldProps[];
}

export interface TabProps {
  tabCode: string;
  tabName: string;
  tabDescription: string;
  type: TabType;
  fields?: FieldProps[];
  columns?: ColumnProps[];
  actions?: ActionProps[];
  _links: object;
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
  sorter: any;
  filterable?: boolean;
  filterOperator?: FilterOperatorType;
  editable?: boolean;
  columnActions?: ActionProps[];
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
  _links?: LinksType;
}

export interface TabPaneFormProps {
  tab: TabProps;
}

export interface RsqlParamProps {
  key: string;
  operator?: string;
  value: string | number | boolean;
}

export type ModeType = "view" | "add";

export interface QueryProps {
  id: string;
}

export interface RuleProps {
  required?: boolean;
  type?: string;
  value?: string | number;
  message?: string;
  max?: number;
  min?: number;
}
