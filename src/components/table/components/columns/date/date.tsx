import React, { useContext } from "react";
import { RecordType } from "../../../../../constants";
import { getDateWithTimezone } from "../../../../../utils";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface DateProps {
  value: string;
  format?: string;
  record: RecordType;
}

export const Date = ({ value, format, record }: DateProps) => {
  const formattedDate = format
    ? getDateWithTimezone(value).format(format)
    : value;
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext(SearchedColumnsContext);

  const searchedColumn = searchedColumns.find(
    (column) => column.column === record.columnCode
  );

  return (
    <HighlightTextWrapper
      text={formattedDate}
      searched={[searched, searchedColumn?.searched ?? ""]}
    />
  );
};

export default Date;
