import React, { useContext } from "react";
import { RecordType } from "../../../../../constants";
import { getDateWithTimezone } from "../../../../../utils";
import { SearchedContext } from "../../../utils";
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
  const searched = useContext(SearchedContext);

  return <HighlightTextWrapper text={formattedDate} searched={[searched]} />;
};

export default Date;
