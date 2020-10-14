import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../../constants";
import { getRsqlParams } from "../../utils";

export const getSearchByColumnsRsql = (
  columns: string[],
  searched: string
) => ({
  key: "entityData",
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${columns.join(",")},"${searched.replace('"', '\\"')}")`,
});

export const getUserProfileRsqlParams = (id: string) => ({
  key: "userProfileId",
  value: id,
});

export const getQueryString = (searched?: string, userProfileId?: string) => {
  let params: RsqlParamProps[] = [];

  if (searched) {
    params.push(
      getSearchByColumnsRsql(["phone", "inn", "shortName", "city"], searched)
    );
  }
  if (userProfileId) {
    params.push(getUserProfileRsqlParams(userProfileId));
  }

  return getRsqlParams(params);
};
