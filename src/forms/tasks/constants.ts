export type TitleTypeType = "secondary" | "success" | undefined;

export interface ColumnTaskProps {
  date: string | null;
  title: string;
  titleType: TitleTypeType;
  query: string;
  dividerColor: typeof DIVIDER_COLORS[number];
  reloadKey: string;
  dateFormat: string;
}

export const DIVIDER_COLORS = ["warning", "primary", "error"];

export const INFINITY_SCROLL_STEP = 10;

export const CELL_COLORS = {
  VIEW: "rgba(0, 0, 0)",
  NOT_VIEW: "rgba(0, 0, 0, 0.25)",
  SELECTED: "rgba(255, 255, 255)",
};
