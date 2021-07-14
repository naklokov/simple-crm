import moment, { unitOfTime as unitProps } from "moment-timezone";
import {
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
  TASK_DATE_FIELD_CODE,
} from "../constants";

export const getRsqlParams = (params: RsqlParamProps[]) => {
  const queries = params.map(
    ({ key, value, operator = RSQL_OPERATORS_MAP.EQUAL }) =>
      `${key}${operator}${value}`
  );

  return queries.filter((o) => !!o).join(";");
};

export const getSearchRsql = (
  keys: string[],
  searched: string,
  entityName = "entityData"
) => {
  const value = searched.replace(/"/g, '\\"').trim().toLowerCase();
  return getLikeRsql(keys, value, entityName);
};

export const getLikeRsql = (
  keys: string[],
  value: string,
  entityName = "entityData"
) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${keys.join(",")},"${value}")`,
});

export const getDateBetweenRsql = ({
  fieldCode = "date",
  searched,
  unitOfTime = "day",
}: {
  searched: string;
  fieldCode?: string;
  unitOfTime?: unitProps.StartOf;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
  value: `("${moment(searched).startOf(unitOfTime).toISOString()}","${moment(
    searched
  )
    .endOf(unitOfTime)
    .toISOString()}")`,
});

export const getDateBeforeRsql = ({
  fieldCode = "date",
  searched,
}: {
  searched: string;
  fieldCode?: string;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_BEFORE,
  value: searched,
});

export const getDateAfterRsql = ({
  fieldCode = "date",
  searched,
}: {
  searched: string;
  fieldCode?: string;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_AFTER,
  value: searched,
});

export const getDateFieldBetweenRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
  unitOfTime = "day",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
  unitOfTime?: unitProps.StartOf;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BETWEEN,
  value: `(${fieldCode},"${moment(date)
    .startOf(unitOfTime)
    .toISOString()}","${moment(date).endOf(unitOfTime).toISOString()}")`,
});

export const getDateFieldBeforeRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BEFORE,
  value: `(${fieldCode},"${date}")`,
});

export const getDateFieldAfterRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_AFTER,
  value: `(${fieldCode},"${date}")`,
});

export const getFieldEqualRsql = ({
  searched,
  fieldCode,
  entityName = "entityData",
}: {
  searched: string | number;
  fieldCode: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.FIELD_EQUAL,
  value: `(${fieldCode},"${searched}")`,
});

export const getEqualRsql = (key: string, value: string) => ({
  key,
  value,
});

export const getValueFromRsql = (query: string) => {
  const [, operator, valueArea = ""] = query.split("=");

  if (!operator) {
    return valueArea;
  }
  const regexp = /^.*"(.*)".*$/;
  const matches = regexp.exec(valueArea);

  return matches?.[1] ?? "";
};
