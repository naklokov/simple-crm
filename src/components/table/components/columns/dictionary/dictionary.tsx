import React, { useContext } from "react";
import { connect } from "react-redux";
import { ColumnProps } from "../../../../../constants";
import { HighlightTextWrapper } from "../../../../../wrappers";
import { State } from "../../../../../__data__/interfaces";
import { SearchedContext } from "../../../utils";

interface DictionaryProps {
  value: string;
  column: ColumnProps;
  dictionaries: any;
}

export const Dictionary = ({
  value,
  column,
  dictionaries,
}: DictionaryProps) => {
  const searched = useContext(SearchedContext);
  const { columnCode, valueField = "", titleField = "" } = column;
  const dictionary = dictionaries?.[columnCode] ?? [];
  const option = dictionary?.find((o: any) => o[valueField] === value);
  const text = option?.[titleField] ?? "";

  return <HighlightTextWrapper text={text} searched={searched} />;
};

const mapStateToProps = (state: State) => ({
  dictionaries: state?.data?.dictionaries,
});

export default connect(mapStateToProps)(Dictionary);
