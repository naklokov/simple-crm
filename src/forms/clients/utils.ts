import {
  FetchParamsProps,
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
} from "../../constants";
import { getRsqlParams } from "../../utils";

export const getSearchRsqlParams = (searched: string) => {
  if (searched) {
    return {
      key: "entityData",
      operator: RSQL_OPERATORS_MAP.LIKE,
      value: `(phone,shortName,city,${searched})`,
    };
  } else {
    return null;
  }
};

export const getClientsRsqlQuery = (
  defaultRsql: RsqlParamProps[],
  fetchParams: FetchParamsProps = {}
) => {
  const { rsql } = fetchParams;

  if (rsql) {
    return getRsqlParams([...defaultRsql, ...rsql]);
  }

  return getRsqlParams(defaultRsql);
};
