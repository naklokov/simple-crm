import { TaskStatusType } from "./interfaces";

export const DATE_FORMATS = {
  DATE: "DD.MM.YYYY",
  DATE_TIME: "DD.MM.YYYY HH:mm",
  TIME: "HH:mm",
};

export const DEFAULT_SPAN = { md: 8, lg: 6, xl: 6 };
export const GUTTER_FULL_WIDTH = {
  HORIZONTAL: 48,
  VERTICAL: 16,
};

export const CLIENT_NEW_ID = "new";

export const RSQL_OPERATORS_MAP = {
  LIKE: "=JLIKE=",
  EQUAL: "==",
  FIELD_EQUAL: "=JEQ=",
};

export const TASK_STATUSES = {
  COMPLETED: "COMPLETED",
  NOT_COMPLETED: "NOT_COMPLETED",
};

export const TASK_TYPES = {
  CALL: "CALL",
};

export const TASK_TYPES_MAP = {
  CALL: "Звонок",
};
