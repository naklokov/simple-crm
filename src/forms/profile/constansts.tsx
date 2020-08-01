import { Main } from "./tabs";

const TABS = {
  MAIN: "main",
};

export const TABS_CONTENT = [
  {
    title: "Профиль",
    id: TABS.MAIN,
  },
];

export const TABS_MAP = {
  [TABS.MAIN]: Main,
};
