import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { ColumnProps, RecordType, State } from "../../../../../constants";
import {
  getConcatenationQueryRsql,
  getInitialParams,
  useFetch,
} from "../../../../../utils";
import { HighlightTextWrapper } from "../../../../../wrappers";
import { Skeleton } from "../../../../skeleton";
import { SearchedAllContext, SearchedColumnsContext } from "../../../utils";

interface EntityProps {
  value: string;
  column: ColumnProps;
}

export const Entity = ({ value, column }: EntityProps) => {
  const {
    columnCode,
    valueField = "",
    titleField = "",
    _links: links,
  } = column;

  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const [url, initialSearch] = links?.self?.href?.split("?") ?? [];
  const { initialQueries, initialSearchParams } = getInitialParams(
    initialSearch
  );

  const [entities, loading] = useFetch<any>({
    url,
    params: {
      query: getConcatenationQueryRsql("", initialQueries),
      ...initialSearchParams,
    },
    cache: true,
  });

  const searchedColumnText = useMemo(
    () =>
      entities?.find(
        (o: any) => o[valueField] === searchedColumns?.[columnCode]
      )?.[titleField] ?? "",
    [entities, searchedColumns, columnCode, valueField, titleField]
  );

  const option = useMemo(
    () => entities?.find((o: any) => o[valueField] === value),
    [entities, value, valueField]
  );

  if (loading) {
    return <Skeleton.Input />;
  }

  const text = option?.[titleField] ?? "";

  return (
    <HighlightTextWrapper
      loading={loading}
      text={text}
      searched={[searched, !tableLoading ? searchedColumnText : ""]}
    />
  );
};

export default Entity;
