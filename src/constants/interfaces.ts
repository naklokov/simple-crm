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
