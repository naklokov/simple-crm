import { toNumber, toString } from "lodash";
import { parse, stringify } from "query-string";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ColumnProps, RecordType, RSQL_DELIMETER } from "../../../constants";
import {
  getDateBetweenRsql,
  getEqualRsql,
  getFieldEqualRsql,
  getRsqlParams,
  getSearchRsql,
  getValueFromRsql,
} from "../../../utils";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants";

const filterEmptyValues = (object: RecordType) =>
  Object.keys(object)
    .filter((key) => !!object[key])
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: object[key],
      }),
      {}
    );

export const getInitialQueries = (initialSearch: string) => {
  const { query } = parse(initialSearch);
  return toString(query)
    .split(RSQL_DELIMETER)
    .filter((o) => !!o);
};

export const getFetchDataSourceQuery = (
  filters: RecordType = {},
  initialQueries: string[]
) => {
  const notEmptyFilters = filterEmptyValues(filters);
  return Object.values(notEmptyFilters)
    .concat(initialQueries.filter((q) => !!q))
    .join(RSQL_DELIMETER);
};

export const getSearchedColumnsFromFilters = (filters: RecordType) =>
  Object.keys(filters).reduce((acc, filterKey) => {
    const value = getValueFromRsql(filters[filterKey]);
    if (value) {
      return {
        ...acc,
        [filterKey]: value,
      };
    }

    return acc;
  }, {});

export const getFilterAllRsqlQuery = (
  searched: string,
  searchedKeys: string[]
) => getRsqlParams([getSearchRsql(searchedKeys, searched)]);

export const getFilterColumnRsqlQuery = (
  searched: string,
  column: ColumnProps
) => {
  if (column.columnType === "date") {
    return getRsqlParams([
      getDateBetweenRsql({ fieldCode: column.columnCode, searched }),
    ]);
  }

  if (column.columnType === "dictionary" || column.columnType === "entity") {
    const rsql = column.isJsonField
      ? getFieldEqualRsql({ searched, fieldCode: column.columnCode })
      : getEqualRsql(column.columnCode, searched);

    return getRsqlParams([rsql]);
  }

  return getRsqlParams([getSearchRsql([column.columnCode], searched)]);
};

export const useTableServerPagingParams = (
  defaultPageSize: number = DEFAULT_PAGE_SIZE
) => {
  const history = useHistory();
  const searchParams = parse(history.location.search);
  const [page, setPage] = useState(
    toNumber(searchParams.page) || DEFAULT_PAGE_NUMBER
  );
  const [pageSize, setPageSize] = useState(
    toNumber(searchParams.pageSize) || defaultPageSize
  );
  const [sortBy, setSortBy] = useState(toString(searchParams.sortBy));
  const [filters, setFilters] = useState(
    JSON.parse(toString(searchParams.filters || "{}"))
  );

  const saveToUrlSearch = useCallback(
    (params = {}) => {
      const queryParams = parse(history.location.search);
      history.replace({
        search: stringify({
          ...queryParams,
          ...params,
        }),
      });
    },
    [history]
  );

  useEffect(() => {
    saveToUrlSearch({
      page,
      pageSize,
      sortBy,
      filters: JSON.stringify(filters),
    });
  }, [page, pageSize, sortBy, filters, saveToUrlSearch]);

  return {
    page,
    pageSize,
    sortBy,
    filters,
    setPage,
    setPageSize,
    setFilters,
    setSortBy,
  };
};
