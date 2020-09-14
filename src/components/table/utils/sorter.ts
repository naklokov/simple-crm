import { ColumnProps, ColumnType } from "../../../constants/interfaces";

const getSorterFunction = (
  columnCode: string,
  columnType: ColumnType
): ((a: any, b: any) => any) => {
  if (columnType === "number") {
    return (a: any, b: any) => a[columnCode] - b[columnCode];
  }

  return (a: any, b: any) =>
    a[columnCode].toLowerCase().localeCompare(b[columnCode].toLowerCase());
};

export const getSorterProp = (column: ColumnProps) => {
  if (column.sorter) {
    return { sorter: getSorterFunction(column.columnCode, column.columnType) };
  }

  return {};
};
