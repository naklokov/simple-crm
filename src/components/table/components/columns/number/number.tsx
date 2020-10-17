import React, { useContext, useRef } from "react";
import { ColumnFormatType, RecordType } from "../../../../../constants";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface NumberProps {
  value: number | string;
  format?: ColumnFormatType;
  record: RecordType;
}

const formatNumber = (
  number: number | string,
  format: ColumnFormatType,
  record: RecordType
) => {
  const currency = record?.currency ?? "RUB";
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: format,
    currency,
  });

  return formatter.format(+number);
};

export const Number = ({ value, format, record }: NumberProps) => {
  const formattedNumber = format
    ? formatNumber(value, format, record)
    : value.toString();
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext(SearchedColumnsContext);

  const searchedColumn = searchedColumns.find(
    (column) => column.column === record.columnCode
  );

  return (
    <HighlightTextWrapper
      text={formattedNumber}
      searched={[searched, searchedColumn?.searched ?? ""]}
    />
  );
};

export default Number;
