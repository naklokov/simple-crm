import { SortOrder } from "antd/lib/table/interface";
import { ColumnProps, ColumnType } from "../../../constants";
import { getDateWithTimezone } from "../../../utils";
import { DefaultSortProps } from "../constants";

const ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

export const getDefaultSort = (
  sortBy: string
): DefaultSortProps | undefined => {
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
  order: SortOrder;
}) => {
  if (order) {
    return `${field}:${ORDER_MAP[order]}`;
  }

  return "";
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

export const getSorterProp = (column: ColumnProps) => {
  if (column.sorter) {
    return { sorter: getSorterFunction(column.columnCode, column.columnType) };
  }

  return {};
};
