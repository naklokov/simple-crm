import React, { useContext } from "react";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { ColumnProps, RecordType, State } from "../../../../../constants";
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
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const formattedDate = format
    ? getDateWithTimezone(value).format(format)
    : value;

  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const columnValue = searchedColumns?.[column.columnCode];
  const seachedColumnsValue = columnValue
    ? moment(columnValue).format(format)
    : "";

  if (!value) {
    return null;
  }

  return (
    <HighlightTextWrapper
      loading={tableLoading}
      text={formattedDate}
      searched={[searched, seachedColumnsValue]}
    />
  );
};

export default Date;
