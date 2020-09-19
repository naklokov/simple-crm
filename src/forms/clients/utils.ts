import { RSQL_OPERATORS_MAP } from "../../constants";

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
