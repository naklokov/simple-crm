import React, { ReactNode } from "react";
import { PhoneColored } from "../assets/icons";

export const DATE_FORMATS = {
  DATE: "DD.MM.YYYY",
  DATE_TIME: "DD.MM.YYYY HH:mm",
  TIME: "HH:mm",
};

export const DEFAULT_FIELD_SPAN = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };
export const GUTTER_FULL_WIDTH = {
  HORIZONTAL: 48,
  VERTICAL: 16,
};

export const CLIENT_NEW_ID = "new";

export const TASK_STATUSES = {
  COMPLETED: "COMPLETED",
  NOT_COMPLETED: "NOT_COMPLETED",
};

export const TASK_TYPES = {
  CALL: "CALL",
};

export const TASK_TYPES_MAP: { [key: string]: string } = {
  CALL: "Звонок",
};

export const TASKS_TYPES_ICONS_MAP: { [key: string]: ReactNode } = {
  CALL: <PhoneColored />,
};
export const TASK_STATUS_FIELD_CODE = "taskStatus";

export const TASK_DATE_FIELD_CODE = "taskEndDate";

export const TASKS_SHOW_LIMIT = 3;

export const TASKS_ACTIVE_DURATION = 5; // секунд

export const FORM_NAMES = {
  CLIENT_CARD: "clientCard",
  CONTACT_VIEW: "contactView",
  CONTACT_ADD: "contactAdd",
  TASK_ADD: "taskAdd",
  TASK_COMPLETED: "taskCompleted",
  TASK_VIEW: "taskView",
};

export const RSQL_OPERATORS_MAP = {
  LIKE: "=JLIKE=",
  EQUAL: "==",
  FIELD_EQUAL: "=JEQ=",
  DATE_IS_BETWEEN: "=DATEBTWN=",
  DATE_IS_BEFORE: "=DATEBEFORE=",
  DATE_IS_AFTER: "=DATEAFTER=",
  DATE_FIELD_IS_BETWEEN: "=JDATEBTWN=",
  DATE_FIELD_IS_BEFORE: "=JDATEBEFORE=",
  DATE_FIELD_IS_AFTER: "=JDATEAFTER=",
};

export const TOOLTIP_SHOW_DELAY = 1;

export const RSQL_DELIMETER = ";";
