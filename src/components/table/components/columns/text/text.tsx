import React, { useContext } from "react";
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
  column: ColumnProps;
}

export const Text = ({ value, format, record, column }: TextProps) => {
  const formattedText = format ? fillTemplate(format, record) : value;
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext(SearchedColumnsContext);

  return (
    <HighlightTextWrapper
      text={formattedText}
      searched={[searched, searchedColumns[column?.columnCode]]}
    />
  );
};

export default Text;
