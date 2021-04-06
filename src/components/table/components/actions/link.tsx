import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link as LinkUI } from "react-router-dom";
import { ColumnProps, RecordType, State } from "../../../../constants";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";

interface LinkProps {
  title: string;
  href?: string;
  column?: ColumnProps;
}

export const Link: React.FC<LinkProps> = ({ title, column, href = "" }) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);

  return (
    <LinkUI to={href}>
      <HighlightTextWrapper
        loading={tableLoading}
        text={title}
        searched={[searched, searchedColumns?.[column?.columnCode ?? ""] ?? ""]}
      />
    </LinkUI>
  );
};

export default Link;
