import {
  ColumnProps,
  RecordType,
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
} from "../../../constants";
import { getRsqlParams } from "../../../utils";

export const getSearchByColumnsRsql = (
  columns: string[],
  searched: string
) => ({
  key: "entityData",
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${columns.join(",")},"${searched.replace('"', '\\"')}")`,
});

export const getEqualRsql = (key: string, id: string) => ({
  key,
  value: id,
});

export const getQueryString = ({
  searchedAll,
  searchedColumns,
  columns,
  extraRsqlParams = [],
}: {
  searchedAll?: string;
  searchedColumns?: RecordType;
  columns: ColumnProps[];
  extraRsqlParams?: RsqlParamProps[];
}) => {
  let params: RsqlParamProps[] = [];

  if (searchedAll) {
    params.push(
      getSearchByColumnsRsql(["phone", "inn", "shortName", "city"], searchedAll)
    );
  }

  if (searchedColumns) {
    Object.keys(searchedColumns).forEach((key) => {
      const { filterOperator = "rsql" } =
        columns.find((o) => o.columnCode === key) || ({} as ColumnProps);

      if (searchedColumns[key]) {
        if (filterOperator === "equal") {
          params.push(getEqualRsql(key, searchedColumns[key]));
        } else {
          params.push(getSearchByColumnsRsql([key], searchedColumns[key]));
        }
      }
    });
  }

  if (extraRsqlParams?.length) {
    params.push(...extraRsqlParams);
  }

  return getRsqlParams(params);
};
