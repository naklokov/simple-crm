import { ThemeType } from "../../../../constants";

interface ColorThemeOption {
  value: ThemeType;
  label: string;
}

export const LABEL = "Цветовая тема";

export const PLACEHOLDER = "Выберите тему";

export const THEME_OPTIONS: ColorThemeOption[] = [
  {
    value: "light",
    label: "Светлая",
  },
  {
    value: "dark",
    label: "Тёмная",
  },
];
