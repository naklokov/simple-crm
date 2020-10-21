import React, { useContext } from "react";
import { Link as LinkUI } from "react-router-dom";
import { ColumnProps, RecordType } from "../../../../constants";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";

interface LinkProps {
  title: string;
  href?: string;
  column?: ColumnProps;
}

export const Link = ({ title, column, href = "" }: LinkProps) => {
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);

  return (
    <LinkUI to={href}>
      <HighlightTextWrapper
        text={title}
        searched={[searched, searchedColumns?.[column?.columnCode ?? ""] ?? ""]}
      />
    </LinkUI>
  );
};

export default Link;
