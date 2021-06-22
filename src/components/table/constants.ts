export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const FILTER_ALL_NAME = "all";

export interface SortColumnOrderProps {
  [key: string]: "ascend" | "descend";
}

export type SearchType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  onClearAll: () => void;
};
