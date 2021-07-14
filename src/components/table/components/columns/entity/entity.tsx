import React, { useContext } from "react";
import { connect } from "react-redux";
import { ColumnProps, RecordType, State } from "../../../../../constants";
import { HighlightTextWrapper } from "../../../../../wrappers";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";

interface EntityProps {
  value: string;
  column: ColumnProps;
  dictionaries: any;
  tableLoading: boolean;
}

export const Entity = ({
  value,
  column,
  dictionaries,
  tableLoading,
}: EntityProps) => {
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);

  const { columnCode, valueField = "", titleField = "" } = column;
  const options = dictionaries?.[columnCode] ?? [];
  const option = options?.find((o: any) => o[valueField] === value);
  const text = option?.[titleField] ?? "";

  return (
    <HighlightTextWrapper
      loading={tableLoading}
      text={text}
      searched={[searched, searchedColumns[column.columnCode]]}
    />
  );
};

const mapStateToProps = (state: State) => ({
  dictionaries: state?.app?.dictionaries,
  tableLoading: state?.app?.tableLoading,
});

export default connect(mapStateToProps)(Entity);
