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
  ref?: string;
  rows?: number;
}
