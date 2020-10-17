import React, { useContext, useRef } from "react";
import {
  ColumnFormatType,
  ColumnProps,
  RecordType,
} from "../../../../../constants";
import { fillTemplate } from "../../../../../utils";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface TextProps {
  value: string;
  format?: ColumnFormatType;
  record: RecordType;
}

export const Text = ({ value, format, record }: TextProps) => {
  const formattedText = format ? fillTemplate(format, record) : value;
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext(SearchedColumnsContext);

  debugger;
  const searchedColumn = searchedColumns.find(
    (column) => column.column === record.columnCode
  );

  return (
    <HighlightTextWrapper
      text={formattedText}
      searched={[searched, searchedColumn?.searched ?? ""]}
    />
  );
};

export default Text;
