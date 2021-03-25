import React, { useContext } from "react";
import moment from "moment-timezone";
import { ColumnProps, RecordType } from "../../../../../constants";
import { getDateWithTimezone } from "../../../../../utils";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface DateProps {
  value: string;
  format?: string;
  record: RecordType;
  column: ColumnProps;
}

export const Date: React.FC<DateProps> = ({ value, format, column }) => {
  const formattedDate = format
    ? getDateWithTimezone(value).format(format)
    : value;

  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const seachedColumnsValue = moment(
    searchedColumns?.[column.columnCode]
  ).format(format);

  return (
    <HighlightTextWrapper
      text={formattedDate}
      searched={[searched, seachedColumnsValue]}
    />
  );
};

export default Date;
