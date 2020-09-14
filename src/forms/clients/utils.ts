import { RSQL_OPERATORS_MAP } from "../../constants";
import { getRsqlQuery } from "../../utils";

export const getSearchQuery = (searched: string) => {
  if (searched) {
    const { query } = getRsqlQuery([
      {
        key: "entityData",
        operator: RSQL_OPERATORS_MAP.LIKE,
        value: `(phone,shortName,city,${searched})`,
      },
    ]);

    return query;
  } else {
    return "";
  }
};
