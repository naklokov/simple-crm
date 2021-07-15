import { SortOrder } from "antd/lib/table/interface";
import { ColumnProps, ColumnType } from "../../../constants";
import { getDateWithTimezone } from "../../../utils";
import { SortColumnOrderProps } from "../constants";

const ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

export const getSortOrder = (
  sortBy: string
): SortColumnOrderProps | undefined => {
  if (sortBy) {
    const [field, customOrder] = sortBy.split(":");

    const order = customOrder === ORDER_MAP.descend ? "descend" : "ascend";

    return { [field]: order };
  }

  return undefined;
};

export const getSortedParams = ({
  field,
  order,
}: {
  field: string;
  order?: SortOrder;
}) => {
  if (order) {
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
  return getSortedParams({ field, order });
};

const getSorterFunction = (
  columnCode: string,
  columnType: ColumnType
): ((a: any, b: any) => any) => {
  if (columnType === "number") {
    return (a: any, b: any) => a?.[columnCode] - b?.[columnCode];
  }

  if (columnType === "date") {
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

export const getSorterProp = (
  withLocalSort: boolean,
  column: ColumnProps,
  sortColumnOrder?: SortColumnOrderProps
) => {
  const defaultSortOrder = sortColumnOrder?.[column?.columnCode] ?? false;

  if (column.sorter) {
    return {
      sorter: withLocalSort
        ? getSorterFunction(column.columnCode, column.columnType)
        : true,
      defaultSortOrder,
    };
  }

  return {
    defaultSortOrder,
  };
};
