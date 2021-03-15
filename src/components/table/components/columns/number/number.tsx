import React, { useContext, useRef } from "react";
import {
  ColumnFormatType,
  ColumnProps,
  RecordType,
} from "../../../../../constants";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface NumberProps {
  value: number | string;
  format?: ColumnFormatType;
  record: RecordType;
  column: ColumnProps;
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

export const Number: React.FC<NumberProps> = ({
  value,
  format,
  record,
  column,
}) => {
  const formattedNumber = format
    ? formatNumber(value, format, record)
    : value.toString();
  const searched = useContext<string>(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);

  return (
    <HighlightTextWrapper
      text={formattedNumber}
      searched={[searched, searchedColumns[column?.columnCode]]}
    />
  );
};

export default Number;
