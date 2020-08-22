export interface FormFieldProps {
  id: string;
  title?: string;
  description?: string;
  type: "string" | "number" | "boolean" | "date" | "dictionary" | "entity";
  value?: string | number | boolean;
  placeholder?: string;
  readonly: boolean;
  disabled: boolean;
  format?: string;
  rules: Object[];
  url?: string;
  rows?: number;
  span?: number;
  offset?: number;
  permissions?: string[];
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

export interface TableColumnProps {
  columnName: string;
  columnDescription?: string;
  columnCode: string;
  columnType: ColumnType;

  format?: string;
  sorter: any;
  columnActions?: TableActionProps[];
}

export interface TableActionProps {
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
