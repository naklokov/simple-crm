import moment, { unitOfTime as unitProps } from "moment-timezone";
import { parse } from "query-string";
import { replaceLikeChars } from "../components/table/utils";
import {
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
  TASK_DATE_FIELD_CODE,
  RSQL_DELIMETER,
} from "../constants";

export const mergeInitialParams = (
  rsqlQuery: string,
  initialSearch: string
) => {
  const { query: initialQuery, ...initialParams } = parse(initialSearch);

  if (initialQuery) {
    const rsqlQueries = rsqlQuery.split(RSQL_DELIMETER).filter((o) => !!o);
    const initialQueries = initialQuery
      .toString()
      .split(RSQL_DELIMETER)
      .filter((o) => !!o);

    return {
      ...initialParams,
      query: [...rsqlQueries, ...initialQueries].join(RSQL_DELIMETER),
    };
  }

  return { ...initialParams, query: rsqlQuery };
};

export const getRsqlParams = (params: RsqlParamProps[]) => {
  const queries = params.map(
    ({ key, value, operator = RSQL_OPERATORS_MAP.EQUAL }) =>
      `${key}${operator}${value}`
  );

  return queries.filter((o) => !!o).join(";");
};

export const getLikeRsql = (key: string, value: string) => ({
  key,
  operator: RSQL_OPERATORS_MAP.LIKE,
  value,
});

export const getLikeFieldRsql = (
  keys: string[],
  value: string,
  entityName = "entityData"
) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.LIKE_FIELD,
  value: `(${keys.join(",")},"${value}")`,
});

export const getSearchRsql = (
  keys: string[],
  searched: string,
  entityName = "entityData",
  isJsonField = true
) => {
  const value = `%${searched.replace(/"/g, '\\"').trim().toLowerCase()}%`;
  return isJsonField
    ? getLikeFieldRsql(keys, value, entityName)
    : getLikeRsql(keys?.[0], value);
};

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
  const SIMPLE_OPERATORS = [RSQL_OPERATORS_MAP.LIKE, RSQL_OPERATORS_MAP.EQUAL];
  const [, operator, valueArea = ""] = query.split("=");
  const fullOperator = `=${operator}=`;

  if (SIMPLE_OPERATORS.includes(fullOperator)) {
    return valueArea;
  }

  const regexp = /^.*"(.*)".*$/;
  const matches = regexp.exec(valueArea);

  return replaceLikeChars(matches?.[1]);
};
