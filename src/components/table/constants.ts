import {
  ColumnProps,
  ERROR_BACKGROUND_COLOR,
  SUCCESS_BACKGROUND_COLOR,
  WARNING_BACKGROUND_COLOR,
} from "../../constants";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const FILTER_ALL_NAME = "all";

export interface SortColumnOrderProps {
  [key: string]: "ascend" | "descend";
}

/**
 * Тип данных для searched значения в таблице
 */
export type SelectedKeysType = string[] | string;

/**
 * Общий интерфейс для компонента поиска в таблице
 */
export interface SearchComponentProps {
  setSelectedKeys: (keys: SelectedKeysType[]) => void;
  column: ColumnProps;
  selectedKeys: SelectedKeysType;
  confirm: () => void;
  clearFilters: () => void;
}

export type SearchType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  onClearAll: () => void;
};

/**
 * Статусы активности клиента
 */
export const COLUMN_STATUS_MAP = {
  ACTIVE: "active",
  WARNING: "warning",
  EXPIRED: "expired",
};

/**
 * Объект диапазонов значений
 */
type RangesType = {
  [key: string]: {
    from: number;
    to: number;
  };
};

/**
 * Цвета соответствующие статусам активности
 */
export const COLUMN_COLORS_MAP = {
  [COLUMN_STATUS_MAP.ACTIVE]: SUCCESS_BACKGROUND_COLOR,
  [COLUMN_STATUS_MAP.WARNING]: WARNING_BACKGROUND_COLOR,
  [COLUMN_STATUS_MAP.EXPIRED]: ERROR_BACKGROUND_COLOR,
};

/**
 * Константа диапазонов для каждого статуса
 */
export const ACTIVITY_RANGE: RangesType = {
  [COLUMN_STATUS_MAP.ACTIVE]: {
    from: 30,
    to: 0,
  },
  [COLUMN_STATUS_MAP.WARNING]: {
    from: 60,
    to: 31,
  },
  [COLUMN_STATUS_MAP.EXPIRED]: {
    // для универсализации задам максимально старую дату
    from: 100000,
    to: 61,
  },
};
