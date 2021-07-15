import { toString } from "lodash";
import moment, { unitOfTime as unitProps } from "moment-timezone";
import { parse } from "query-string";
import { replaceLikeChars } from "../components/table/utils";
import {
  RsqlParamProps,
  RSQL_OPERATORS_MAP,
  TASK_DATE_FIELD_CODE,
  RSQL_DELIMETER,
} from "../constants";

/**
 * Метод преобразования RSQL параметров в query строку
 * @param params Массив RSQL параметров
 * @returns Query строка
 */
export const getRsqlParams = (params: RsqlParamProps[]) => {
  const queries = params.map(
    ({ key, value, operator = RSQL_OPERATORS_MAP.EQUAL }) =>
      `${key}${operator}${value}`
  );

  return queries.filter((o) => !!o).join(RSQL_DELIMETER);
};

/**
 * Получения LIKE параметров для RSQL для не JSON поля
 * @param key Ключ параметра
 * @param value Значение параметра
 * @returns RSQL параметры
 */
export const getLikeRsql = (key: string, value: string) => ({
  key,
  operator: RSQL_OPERATORS_MAP.LIKE,
  value,
});

/**
 * Получения LIKE параметров для RSQL для JSON поля
 * @param keys Массив ключей для поиска
 * @param value Значение параметра
 * @param entityName Наименование сущности поиска
 * @returns RSQL параметры
 */
export const getLikeFieldRsql = (
  keys: string[],
  value: string,
  entityName = "entityData"
) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.LIKE_FIELD,
  value: `(${keys.join(",")},"${value}")`,
});

/**
 * Метод преобразования параметров для поиска (экранирование, трим)
 * @param keys Массив ключей для поиска
 * @param searched Значение для поиска
 * @param entityName Наименование сущности поиска
 * @param isJsonField Признак является ли данное поле JSON в базе данных
 * @returns Набор параметров для формирования RSQL
 */
export const getSearchRsql = (
  keys: string[],
  searched: string,
  entityName = "entityData",
  isJsonField = true
) => {
  const value = `%${searched.replace(/"/g, '\\"').trim().toLowerCase()}%`;
  return isJsonField
    ? getLikeFieldRsql(keys, value, entityName)
    : getLikeRsql(keys?.[0], value);
};

/**
 * Получение параметров RSQL в рамках начала/конца unitOfTime для не JSON поля
 * @param fieldCode Код поля в БД
 * @param searched Значение для поиска
 * @param unitOfTime Единица измерения времени для взятия начала/конца времени
 * @returns Набор параметров для формирования RSQL
 */
export const getDateBetweenRsql = ({
  fieldCode = "date",
  searched,
  unitOfTime = "day",
}: {
  searched: string;
  fieldCode?: string;
  unitOfTime?: unitProps.StartOf;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
  value: `("${moment(searched).startOf(unitOfTime).toISOString()}","${moment(
    searched
  )
    .endOf(unitOfTime)
    .toISOString()}")`,
});

/**
 * Получение параметров RSQL для даты до `searched` значения
 * @param fieldCode Код поля в БД
 * @param searched Значение для поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getDateBeforeRsql = ({
  fieldCode = "date",
  searched,
}: {
  searched: string;
  fieldCode?: string;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_BEFORE,
  value: searched,
});

/**
 * Получение параметров RSQL для даты после `searched` значения
 * @param fieldCode Код поля в БД
 * @param searched Значение для поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getDateAfterRsql = ({
  fieldCode = "date",
  searched,
}: {
  searched: string;
  fieldCode?: string;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_AFTER,
  value: searched,
});

/**
 * Получение параметров RSQL для диапазона значений для не JSON поля
 * @param from ISO строка минимального значения даты
 * @param to ISO строка максимального значения даты
 * @returns Набор параметров для формирования RSQL
 */
export const getDateRangeBetweenRsql = ({
  from,
  to,
  fieldCode = "date",
}: {
  from: string;
  to: string;
  fieldCode?: string;
}) => ({
  key: fieldCode,
  operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
  value: `("${from}","${to}")`,
});

/**
 * Получение параметров RSQL для диапазона значений для не JSON поля
 * @param from ISO строка минимального значения даты
 * @param to ISO строка максимального значения даты
 * @param fieldCode Код поля в БД
 * @param entityName Наименование сущности поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getDateRangeFieldBetweenRsql = ({
  from,
  to,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
}: {
  from: string;
  to: string;
  fieldCode?: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BETWEEN,
  value: `(${fieldCode},"${from}","${to}")`,
});

/**
 * Получение параметров RSQL в рамках начала/конца unitOfTime для JSON поля
 * @param date Значение даты для поиска
 * @param fieldCode Код поля в БД
 * @param entityName Наименование сущности поиска
 * @param unitOfTime Единица измерения времени для взятия начала/конца времени
 * @returns Набор параметров для формирования RSQL
 */
export const getDateFieldBetweenRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
  unitOfTime = "day",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
  unitOfTime?: unitProps.StartOf;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BETWEEN,
  value: `(${fieldCode},"${moment(date)
    .startOf(unitOfTime)
    .toISOString()}","${moment(date).endOf(unitOfTime).toISOString()}")`,
});

/**
 * Получение параметров RSQL для даты до `date` значения для JSON поля
 * @param date Значение даты для поиска
 * @param fieldCode Код поля в БД
 * @param entityName Наименование сущности поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getDateFieldBeforeRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BEFORE,
  value: `(${fieldCode},"${date}")`,
});

/**
 * Получение параметров RSQL для даты после `date` значения для JSON поля
 * @param date Значение даты для поиска
 * @param fieldCode Код поля в БД
 * @param entityName Наименование сущности поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getDateFieldAfterRsql = ({
  date,
  fieldCode = TASK_DATE_FIELD_CODE,
  entityName = "entityData",
}: {
  date: string;
  fieldCode?: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_AFTER,
  value: `(${fieldCode},"${date}")`,
});

/**
 * Получение параметров RSQL равных `searched` значению для JSON поля
 * @param searched Значение даты для поиска
 * @param fieldCode Код поля в БД
 * @param entityName Наименование сущности поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getFieldEqualRsql = ({
  searched,
  fieldCode,
  entityName = "entityData",
}: {
  searched: string | number;
  fieldCode: string;
  entityName?: string;
}) => ({
  key: entityName,
  operator: RSQL_OPERATORS_MAP.FIELD_EQUAL,
  value: `(${fieldCode},"${searched}")`,
});

/**
 * Получение параметров RSQL равных `searched` значению для не JSON поля
 * @param key Ключ поля поиска
 * @param value Значение для поиска
 * @returns Набор параметров для формирования RSQL
 */
export const getEqualRsql = (key: string, value: string) => ({
  key,
  value,
});

/**
 * Получение search значений из RSQL строки поиска
 * @param query RSQL строка поиска
 * @returns Строка со значением или массив строк, где первое значение это min, а второе - max
 */
export const getValueFromRsql = (query: string) => {
  const SIMPLE_OPERATORS = [RSQL_OPERATORS_MAP.LIKE, RSQL_OPERATORS_MAP.EQUAL];
  const [, operator, valueArea] = query.split("=");
  const fullOperator = `=${operator}=`;

  if (valueArea) {
    if (SIMPLE_OPERATORS.includes(fullOperator)) {
      return replaceLikeChars(valueArea);
    }

    const regexp = /"(.*?)"/g;

    const matches = valueArea.matchAll(regexp);
    const values = [];

    for (const match of matches) {
      const value = replaceLikeChars(match?.[1] ?? "");
      values.push(value);
    }

    // если в rsql строке передано 2 значения, то возвращаем массив, а если одно - первую строку
    return values.length > 1 ? values : values[0];
  }

  return "";
};

/**
 * Метод получения начальных параметров из search строки url адреса
 * @param initialSearch Строка search параметров
 * @returns Объект c RSQL query строкой начальных параметров (initialQueries) и с остальными параметрами (initialSearchParams)
 */
export const getInitialParams = (initialSearch: string) => {
  const { query, ...initialSearchParams } = parse(initialSearch);
  const initialQueries = toString(query)
    .split(RSQL_DELIMETER)
    .filter((o) => !!o);

  return { initialQueries, initialSearchParams };
};
