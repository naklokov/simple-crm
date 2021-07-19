import { ColumnProps } from "../../../constants";
import { getDateWithTimezone } from "../../../utils";
import { SortColumnOrderProps } from "../constants";

const ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

export const getFieldSortOrder = (
  sortBy: string
): SortColumnOrderProps | undefined => {
  if (sortBy) {
    const [field, customOrder] = sortBy.split(":");

    const order = customOrder === ORDER_MAP.descend ? "descend" : "ascend";

    return { [field]: order };
  }

  return undefined;
};

interface SorterProps {
  field: string;
  order?: "ascend" | "descend";
}

export const getSortedParams = (
  sorter: SorterProps,
  columns: ColumnProps[]
) => {
  const { field, order } = sorter;

  if (order) {
    const column = columns.find((item) => item.columnCode === field);
    const sortInverse = column?.sortInverse ?? false;

    if (sortInverse) {
      const invertedOrder =
        sortInverse && order === "ascend" ? "descend" : "ascend";
      return `${field}:${ORDER_MAP[invertedOrder]}`;
    }

    return `${field}:${ORDER_MAP[order]}`;
  }

  return "";
};

/**
 * Метод формирования строки сортировки для отправки на сервер
 * @param columns Конфигурация всех колонок в таблице
 * @param defaultSortField Наименование поля для сортировки по умолчанию
 * @param defaultSortOrder Порядок сортировки по умолчанию
 * @returns Строка с полей и порядком сортировки
 */
export const getDefaultSortBy = (
  columns: ColumnProps[],
  defaultSortField?: string,
  defaultSortOrder?: "ascend" | "descend"
): string => {
  const field = defaultSortField || columns?.[0]?.columnCode;
  const order = defaultSortOrder || "ascend";
  return getSortedParams({ field, order }, columns);
};

const getSorterFunction = (column: ColumnProps): ((a: any, b: any) => any) => {
  const { columnCode, columnType } = column;

  if (columnType === "number") {
    return (a: any, b: any) => a?.[columnCode] - b?.[columnCode];
  }

  if (columnType === "date" || columnType === "dateRange") {
    return (a: any, b: any) =>
      getDateWithTimezone(a?.[columnCode]).diff(
        getDateWithTimezone(b?.[columnCode])
      );
  }

  return (a: any, b: any) => {
    const first = a?.[columnCode]?.toLowerCase() ?? "";
    const second = b?.[columnCode]?.toLowerCase() ?? "";

    return first.localeCompare(second);
  };
};

const getSortOrder = (
  sortColumnValue?: "ascend" | "descend",
  needInverse = false
) => {
  if (sortColumnValue) {
    if (needInverse) {
      return sortColumnValue === "ascend" ? "descend" : "ascend";
    }

    return sortColumnValue;
  }

  return false;
};

export const getSorterProp = (
  withLocalSort: boolean,
  column: ColumnProps,
  sortColumnOrder?: SortColumnOrderProps
) => {
  const { columnCode, sortInverse, sorter } = column;
  const sortColumnValue = sortColumnOrder?.[columnCode];

  if (sorter) {
    return {
      sorter: withLocalSort ? getSorterFunction(column) : true,
      sortOrder: getSortOrder(sortColumnValue, sortInverse),
    };
  }

  return {
    sortOrder: false,
  };
};
