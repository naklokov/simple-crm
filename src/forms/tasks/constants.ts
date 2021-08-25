import {
  ERROR_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  WARNING_BACKGROUND_COLOR,
} from "../../constants";

export type TitleTypeType = "secondary" | "success" | undefined;

export interface ColumnTaskProps {
  date: string | null;
  title: string;
  titleType: TitleTypeType;
  query: string;
  dividerClassName: typeof DIVIDER_CLASS_NAMES[number];
  reloadKey: string;
  dateFormat: string;
}

export const DIVIDER_CLASS_NAMES = [
  WARNING_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  ERROR_BACKGROUND_COLOR,
];
export const INFINITY_SCROLL_STEP = 10;

export const CELL_COLORS = {
  VIEW: "rgba(0, 0, 0)",
  NOT_VIEW: "rgba(0, 0, 0, 0.25)",
  SELECTED: "rgba(255, 255, 255)",
};
