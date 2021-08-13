import React, { ReactNode } from "react";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { PhoneColored } from "../assets/icons";
import { ValidationStatusType } from "./interfaces";

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
  PROFILE: "profile",
  CLIENT_CARD: "clientCard",
  CONTACT_VIEW: "contactView",
  CONTACT_ADD: "contactAdd",
  TASK_ADD: "taskAdd",
  TASK_COMPLETED: "taskCompleted",
  TASK_VIEW: "taskView",
  DEPARTMENT_CARD: "departmentCard",
  DEPARTMENT_CHIEF_CHANGE: "departmentChiefChange",
};

export const RSQL_OPERATORS_MAP = {
  LIKE: "=LIKE=",
  LIKE_FIELD: "=JLIKE=",
  EQUAL: "==",
  FIELD_EQUAL: "=JEQ=",
  DATE_IS_BETWEEN: "=DATEBTWN=",
  DATE_IS_BEFORE: "=DATEBEFORE=",
  DATE_IS_AFTER: "=DATEAFTER=",
  DATE_FIELD_IS_BETWEEN: "=JDATEBTWN=",
  DATE_FIELD_IS_BEFORE: "=JDATEBEFORE=",
  DATE_FIELD_IS_AFTER: "=JDATEAFTER=",
};

export const RSQL_OPERATORS_REGEXP_MAP = {
  // id=LIKE=%test%
  [RSQL_OPERATORS_MAP.LIKE]: /^.*=(.*)$/,
  // entityData=JLIKE=(id,name,"text")
  [RSQL_OPERATORS_MAP.LIKE_FIELD]: /^.*,"(.*)".*$/,
  // id==12345
  [RSQL_OPERATORS_MAP.EQUAL]: /^.*==(.*)$/,
  // entityData=JEQ=(id,name,"text")
  [RSQL_OPERATORS_MAP.FIELD_EQUAL]: /^.*"(.*)".*$/,
  // date=DATEBTWN=("2020-10-01T00:00:00", "2020-11-01T00:00:00")
  [RSQL_OPERATORS_MAP.DATE_IS_BETWEEN]: /^.*=\w+=\("(.*)",\s?"(.*)"\)$/,
  // date=DATEBEFORE=2020-11-01T00:00:00
  [RSQL_OPERATORS_MAP.DATE_IS_BEFORE]: /^.*=(.*)$/,
  // date=DATEAFTER=2020-11-01T00:00:00
  [RSQL_OPERATORS_MAP.DATE_IS_AFTER]: /^.*=(.*)$/,
  // entityData=JDATEBTWN=(fieldCode,"2020-10-01T00:00:00", "2020-11-01T00:00:00")
  [RSQL_OPERATORS_MAP.DATE_FIELD_IS_BETWEEN]: /^.*=\w+=\(.*"(.*)",\s?"(.*)"\)$/,
  // entityData=JDATEBEFORE=(fieldCode,"2020-10-01T00:00:00")
  [RSQL_OPERATORS_MAP.DATE_FIELD_IS_BEFORE]: /^.*=\w+=\(.*"(.*)"\)$/,
  // entityData=JDATEAFTER=(fieldCode,"2020-10-01T00:00:00")
  [RSQL_OPERATORS_MAP.DATE_FIELD_IS_AFTER]: /^.*=\w+=\(.*"(.*)"\)$/,
};

export const TOOLTIP_SHOW_DELAY = 1;

export const RSQL_DELIMETER = ";";

export const validationIcons = {
  info: {
    color: "#1890ff",
    get icon() {
      return (
        <InfoCircleOutlined style={{ color: this.color, cursor: "pointer" }} />
      );
    },
  },
  warning: {
    color: "#faad14",
    get icon() {
      return (
        <WarningOutlined style={{ color: this.color, cursor: "pointer" }} />
      );
    },
  },
  get(type: ValidationStatusType | undefined) {
    return (
      (type && this?.[type]) ?? {
        color: "",
        get icon() {
          return null;
        },
      }
    );
  },
};
