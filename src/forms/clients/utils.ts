import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../../constants";
import { getRsqlParams } from "../../utils";

export const getSearchRsqlParams = (searched: string) => ({
  key: "entityData",
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(phone,shortName,city,${searched})`,
});

export const getUserProfileRsqlParams = (id: string) => ({
  key: "userProfileId",
  value: id,
});

export const getQueryString = (searched?: string, userProfileId?: string) => {
  let params: RsqlParamProps[] = [];

  if (searched) {
    params.push(getSearchRsqlParams(searched));
  }
  if (userProfileId) {
    params.push(getUserProfileRsqlParams(userProfileId));
  }

  return getRsqlParams(params);
};
