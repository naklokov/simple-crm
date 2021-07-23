import { LabeledValue } from "antd/lib/select";
import { LinksType } from "../../../constants";
import {
  getConcatenationQueryRsql,
  getInitialParams,
  getRsqlParams,
  getSearchRsql,
} from "../../../utils";

const OFFSET_BOTTOM = 150;

export const getMappedOptions = (
  data: any[],
  keyCode: string,
  valueCode: string
): LabeledValue[] =>
  data?.map((item) => {
    const { [keyCode]: label, [valueCode]: value } = item;
    return { label, value };
  }) ?? [];

export const isScrollBottom = (event: React.UIEvent<HTMLDivElement, UIEvent>) =>
  event?.currentTarget?.scrollTop + event?.currentTarget?.offsetHeight >=
  event?.currentTarget?.scrollHeight - OFFSET_BOTTOM;

export const getFetchParams = (
  searched: string = "",
  titleField: string,
  links: LinksType
) => {
  const [url, searchString] = links?.self?.href?.split("?") ?? [];

  const querySearch = searched
    ? getRsqlParams([getSearchRsql([titleField], searched)])
    : "";

  const { initialQueries, initialSearchParams } = getInitialParams(
    searchString
  );
  const query = getConcatenationQueryRsql(querySearch, initialQueries);

  return { url, params: initialSearchParams, query };
};
