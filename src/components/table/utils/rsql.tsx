import {
  ColumnProps,
  RecordType,
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
} from "../../../constants";
import { getRsqlParams } from "../../../utils";

export const getSearchByColumnsRsql = (
  columns: string[],
  searched: string,
  entityName = "entityData"
) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${columns.join(",")},"${searched.replaceAll('"', '\\"')}")`,
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
  entityName,
}: {
  searchedAll?: string;
  searchedColumns?: RecordType;
  columns: ColumnProps[];
  extraRsqlParams?: RsqlParamProps[];
  entityName?: string;
}) => {
  let params: RsqlParamProps[] = [];

  if (searchedAll) {
    params.push(
      getSearchByColumnsRsql(
        ["phone", "inn", "shortName", "city"],
        searchedAll,
        entityName
      )
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
          params.push(
            getSearchByColumnsRsql([key], searchedColumns[key], entityName)
          );
        }
      }
    });
  }

  if (extraRsqlParams?.length) {
    params.push(...extraRsqlParams);
  }

  return getRsqlParams(params);
};
