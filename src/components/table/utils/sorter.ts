import { ColumnProps, ColumnType } from "../../../constants";

const getSorterFunction = (
  columnCode: string,
  columnType: ColumnType
): ((a: any, b: any) => any) => {
  if (columnType === "number") {
    return (a: any, b: any) => a?.[columnCode] - b?.[columnCode];
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
