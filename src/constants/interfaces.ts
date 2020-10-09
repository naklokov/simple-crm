import { Rule } from "antd/lib/form";

export type TabType = "container" | "table" | "custom";

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "dictionary"
  | "entity"
  | "phone";

export type FieldFormatType = "textarea" | string;

export type FullCalendarDateType = "DD.MM.YYYY";
export type FullCalendarDateTimeType = "DD.MM.YYYY HH:mm";

export type ColumnFormatType =
  | "currency"
  | FullCalendarDateType
  | FullCalendarDateTimeType;

export type ModeType = "view" | "add";

export type TaskStatusType = "COMPLETED" | "NOT_COMPLETED" | "ACTIVE";

export type TaskTypeType = "CALL";

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

export interface SpanProps {
  md?: number;
  xl?: number;
  lg?: number;
}

export interface DrawerProps {
  code: string;
  name: string;
  description: string;
  fields: FieldProps[];
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
  _links?: {
    self: {
      href: string;
    };
  };
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

export type TabPositionType = "lower" | "upper" | undefined;

export interface TableProps {
  tableName: string;
  tableDescription: string;
  tableCode: string;
  columns: ColumnProps[];
  tableActions: ActionProps[];
}

export interface RsqlParamProps {
  key: string;
  operator?: string;
  value: string | number | boolean;
}

export interface DictionaryProps {
  id?: string;
  dictionaryCode?: string;
  dictionaryName?: string;
  dictionaryDescription?: string;
  dictionaryValueEntities?: OptionProps[];
}

export interface OptionProps {
  id: string;
  dictionaryId: string;
  valueCode: string;
  value: string;
  valueDescription?: string;
  deleted: boolean;
}

export interface ErrorProps {
  errorDescription?: string;
  errorCode?: string;
  errorMessage?: string;
}


export type RecordType = { [key: string]: string };
export type ActionType = "href" | "delete" | "call" | "email" | "view" | "done";
export type ColumnType =
  | "string"
  | "date"
  | "number"
  | "dictionary"
  | "entity"
  | "boolean";

export interface ColumnProps {
  columnName: string;
  columnDescription?: string;
  columnCode: string;
  columnType: ColumnType;
  titleField?: string;
  valueField?: string;
  format?: ColumnFormatType;
  sorter: any;
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

export interface EntityProps {
  id: string;
  businessId: string;
  isOwner?: boolean;
}

export interface ClientEntityProps {
  activityField: string;
  address: string;
  businessId: string;
  checkingAccount: string;
  city: string;
  corrdespondentAccount: string;
  creationDate: string;
  email: string;
  fullName: string;
  id: string;
  inn: string;
  isActive: boolean;
  isDeleted: boolean;
  kpp: string;
  legalAddress: string;
  userProfileId: string;
  parentId: string;
  phone: string;
  servicingBank: string;
  shortName: string;
  webPage: string;
  isOwner: boolean;
}

export interface CommentEntityProps {
  _links: {
    self: {
      href: string;
    };
  };
  commentText: string;
  creationDate: string;
  entityId: string;
  entityType: string;
  userProfileId?: string;
  id: string;
  isOwner: boolean;
}

export interface TaskEntityProps {
  clientId: string;
  creationDate: string;
  historyId: string;
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  isOwner: boolean;
  userProfileId: string;
  taskDescription: string;
  taskStatus: TaskStatusType;
  taskType: TaskTypeType;
  taskEndDate: string;
  format?: string;
}
