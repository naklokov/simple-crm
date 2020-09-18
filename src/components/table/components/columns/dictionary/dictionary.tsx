import React from "react";
import { connect } from "react-redux";
import { ColumnProps } from "../../../../../constants";
import { dictionaries } from "../../../../../constants/urls";
import { State } from "../../../../../__data__/interfaces";

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
  const { columnCode, valueField = "", titleField = "" } = column;
  const dictionary = dictionaries?.[columnCode] ?? [];
  const option = dictionary?.find((o: any) => o[valueField] === value);

  return <span>{option?.[titleField] ?? ""}</span>;
};

const mapStateToProps = (state: State) => ({
  dictionaries: state?.app?.dictionaries ?? {},
});

export default connect(mapStateToProps)(Dictionary);
