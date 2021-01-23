import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../constants";

export const getRsqlParams = (params: RsqlParamProps[]) => {
  const queries = params.map(
    ({ key, value, operator = RSQL_OPERATORS_MAP.EQUAL }) =>
      `${key}${operator}${value}`
  );

  return queries.filter((o) => !!o).join(";");
};

export const getLikeRsql = (
  keys: string[],
  searched: string,
  entityName = "entityData"
) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${keys.join(",")},"${searched.replace(/"/g, '"').toLowerCase()}")`,
});

export const getEqualRsql = (key: string, value: string) => ({
  key,
  value,
});
