import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ColumnProps,
  RecordType,
  DictionaryProps,
  State,
} from "../../../../../constants";
import { useFetch } from "../../../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";
import { Skeleton } from "../../../../skeleton";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";

interface DictionaryFieldProps {
  value: string;
  column: ColumnProps;
}

export const Dictionary = ({ value, column }: DictionaryFieldProps) => {
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const { columnCode, _links: links } = column;

  const [{ values: options }, loading] = useFetch<DictionaryProps>({
    url: links?.self?.href ?? "",
    initial: {},
    cache: true,
  });

  const option = useMemo(
    () => options?.find((o: any) => o.valueCode === value),
    [options, value]
  );

  const searchedColumnText = useMemo(
    () =>
      options?.find((o: any) => o.valueCode === searchedColumns?.[columnCode])
        ?.value ?? "",
    [options, searchedColumns, columnCode]
  );

  if (loading) {
    return <Skeleton.Input />;
  }

  const text = option?.value ?? "";

  return (
    <HighlightTextWrapper
      loading={loading}
      text={text}
      searched={[searched, !tableLoading ? searchedColumnText : ""]}
    />
  );
};

export default Dictionary;
