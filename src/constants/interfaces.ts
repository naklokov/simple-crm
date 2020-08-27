import { Rule } from "antd/lib/form";

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "dictionary"
  | "entity";

export interface RuleProps {
  required?: boolean;
  type?: string;
  value?: string | number;
  message?: string;
  max?: number;
  min?: number;
}

export interface FieldProps {
  fieldCode: string;
  fieldName: string;
  fieldDescription: string;
  type: FieldType;
  readonly: boolean;
  disabled: boolean;
  rules?: Rule[];
  format?: string;
  span?: number;
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
  fields: FieldProps[];
  _links: object;
}

export interface TableProps {
  tableName: string;
  tableDescription: string;
  tableCode: string;
  columns: ColumnProps[];
  tableActions: ActionProps[];
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

export type ActionType = "href" | "delete" | "call" | "email" | "view";
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

  format?: string;
  sorter: any;
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
  managerId: string;
  parentId: string;
  phone: string;
  servicingBank: string;
  shortName: string;
  webPage: string;
}
