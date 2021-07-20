import { isEmpty, toNumber, toString } from "lodash";
import { parse, stringify } from "query-string";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ColumnProps, RecordType, RSQL_DELIMETER } from "../../../constants";
import {
  getDateRangeBetweenRsql,
  getDateRangeFieldBetweenRsql,
  getEqualRsql,
  getFieldEqualRsql,
  getRsqlParams,
  getSearchRsql,
  getValueFromRsql,
} from "../../../utils";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants";

/**
 * Метод удаления из объекта параметров null, undefined, false, ''
 * @param object Объект для фильтрации
 * @returns Объект без "пустых" параметров
 */
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

/**
 * Метод конкатенации начальных параметров и параметров фильтра в строку RSQL
 * @param filters Значения фильтров из таблицы
 * @param initialQueries Переданные начальные значения из url
 * @returns RSQL строка для отправки на сервер
 */
export const getFetchDataSourceQuery = (
  filters: RecordType = {},
  initialQueries: string[]
) => {
  const notEmptyFilters = filterEmptyValues(filters);
  return Object.values(notEmptyFilters)
    .concat(initialQueries.filter((q) => !!q))
    .join(RSQL_DELIMETER);
};

/**
 * Метод получения значений фильтров из RSQL строки
 * @param filters Объект состоящий из кода поля и значения RSQL соответствующего этому полю
 * @returns Объект состоящий из кода и текстового значения введённого в поле фильтра
 */
export const getSearchedColumnsFromFilters = (filters: RecordType) =>
  Object.keys(filters).reduce((acc, filterKey) => {
    const value = getValueFromRsql(filters[filterKey]);

    if (!isEmpty(value)) {
      return {
        ...acc,
        [filterKey]: value,
      };
    }

    return acc;
  }, {});

/**
 * Метод получения RSQL объекта для поиска по всей таблице
 * @param searched Значение для поиска
 * @param searchedKeys Поля по которым необходимо осуществлять поиск
 * @returns Объект с RSQL параметрами
 */
export const getFilterAllRsqlQuery = (
  searched: string,
  searchedKeys: string[]
) => getRsqlParams([getSearchRsql(searchedKeys, searched)]);

/**
 * Метод получения RSQL объекта для поиска по одной колонке в таблице
 * @param searched Значение для поиска
 * @param column Описание полей в колонке
 * @returns Объект с RSQL параметрами
 */
export const getFilterColumnRsqlQuery = (
  searched: any,
  column: ColumnProps
) => {
  if (column.columnType === "date" || column.columnType === "dateRange") {
    const [from, to] = searched;
    const rsql = column.isJsonField
      ? getDateRangeFieldBetweenRsql({
          from,
          to,
          fieldCode: column.columnCode,
        })
      : getDateRangeBetweenRsql({ from, to, fieldCode: column.columnCode });
    return getRsqlParams([rsql]);
  }

  if (column.columnType === "dictionary" || column.columnType === "entity") {
    const rsql = column.isJsonField
      ? getFieldEqualRsql({ searched, fieldCode: column.columnCode })
      : getEqualRsql(column.columnCode, searched);

    return getRsqlParams([rsql]);
  }

  return getRsqlParams([
    getSearchRsql(
      [column.columnCode],
      searched,
      "entityData",
      column.isJsonField
    ),
  ]);
};

/**
 * hook для получения параметров и методов для изменения параметров необходимых для серверного рендеринга
 * @param defaultPageSize Количество отображаемых строк в таблице по умолчанию
 * @returns Параметры серверного пейджинга для запроса и методы их изменяющие
 */
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
