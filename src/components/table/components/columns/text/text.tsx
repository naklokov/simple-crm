import React, { useContext, useRef } from "react";
import { ColumnFormatType, RecordType } from "../../../../../constants";
import { fillTemplate } from "../../../../../utils";
import { SearchedContext } from "../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";

interface TextProps {
  value: string;
  format?: ColumnFormatType;
  record: RecordType;
}

export const Text = ({ value, format, record }: TextProps) => {
  const formattedText = format ? fillTemplate(format, record) : value;
  const searched = useContext(SearchedContext);

  return <HighlightTextWrapper text={formattedText} searched={[searched]} />;
};

export default Text;
