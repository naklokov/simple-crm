import moment, { unitOfTime } from "moment-timezone";
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

export const getDateBetweenRsql = (
  date: string,
  unitOfTime: unitOfTime.StartOf = "day"
) => ({
  key: "date",
  operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
  value: `${moment(date).startOf(unitOfTime).toISOString()},${moment(date)
    .endOf(unitOfTime)
    .toISOString()}`,
});

export const getDateBeforeRsql = (date: string) => ({
  key: "date",
  operator: RSQL_OPERATORS_MAP.DATE_IS_BEFORE,
  value: date,
});

export const getDateAfterRsql = (date: string) => ({
  key: "date",
  operator: RSQL_OPERATORS_MAP.DATE_IS_AFTER,
  value: date,
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
  unitOfTime?: unitOfTime.StartOf;
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
