export type SortOrderType = "desc" | "asc";

export interface SortType {
  onSort: (order: SortOrderType) => void;
}

export const ORDER_TYPES: SortOrderType[] = ["asc", "desc"];
