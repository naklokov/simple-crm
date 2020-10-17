import { isEmpty } from "lodash";
import { RsqlParamProps, RSQL_OPERATORS_MAP, TableSearchColumnsType } from "../../constants";
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

export const getQueryString = ({
  searchedAll,
  searchedColumns,
  userProfileId,
}: {
  searchedAll?: string;
  searchedColumns?: TableSearchColumnsType[];
  userProfileId?: string;
}) => {
  let params: RsqlParamProps[] = [];

  if (searchedAll) {
    params.push(
      getSearchByColumnsRsql(["phone", "inn", "shortName", "city"], searchedAll)
    );
  }

  if (!isEmpty(searchedColumns)) {
    searchedColumns?.forEach(({ column, searched }) => {
      params.push(getSearchByColumnsRsql([column], searched));
    });
  }

  if (userProfileId) {
    params.push(getUserProfileRsqlParams(userProfileId));
  }

  return getRsqlParams(params);
};
