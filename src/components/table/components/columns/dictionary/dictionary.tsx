import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { State, ColumnProps, RecordType } from "../../../../../constants";
import { HighlightTextWrapper } from "../../../../../wrappers";
import { Skeleton } from "../../../../skeleton";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";

interface DictionaryProps {
  value: string;
  column: ColumnProps;
  dictionaries: any;
  tableLoading: boolean;
}

export const Dictionary = ({
  value,
  column,
  dictionaries,
  tableLoading,
}: DictionaryProps) => {
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const { columnCode } = column;

  const options = dictionaries?.[columnCode]?.dictionaryValueEntities ?? [];
  const option = options?.find((o: any) => o.valueCode === value);

  if (value && !option) {
    return <Skeleton.Input />;
  }

  const text = option?.value ?? "";

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

export default connect(mapStateToProps)(Dictionary);
