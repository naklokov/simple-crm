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

export const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];
export const TASK_STATUS_FIELD_CODE = "taskStatus";
export const INFINITY_SCROLL_STEP = 5;
