import React, { useContext } from "react";
import { useSelector } from "react-redux";
import {
  ColumnFormatType,
  ColumnProps,
  RecordType,
  State,
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

export const Text: React.FC<TextProps> = ({
  value,
  format,
  record,
  column,
}) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const formattedText = format ? fillTemplate(format, record) : value;
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext(SearchedColumnsContext);

  return (
    <HighlightTextWrapper
      loading={tableLoading}
      text={formattedText}
      searched={[searched, searchedColumns[column?.columnCode]]}
    />
  );
};

export default Text;
