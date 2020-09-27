import { parse, stringify } from "query-string";
import { TabPositionType, TabProps } from "../../constants";

export const getActiveQueryTab = (tabs: TabProps[]) => {
  const queries = parse(window.location.search);
  const values = Object.values(queries);
  return tabs.find(({ tabCode }) => values.includes(tabCode)) || tabs[0];
};

export const setActiveQueryTab = (value: string, key: string, history: any) => {
  const queries = parse(window.location.search);
  const updated = {
    ...queries,
    [key]: value,
  };
  history.push({ search: stringify(updated) });
};

export const getPositionQueryParam = (position: TabPositionType) =>
  position ? `${position}:tab` : `tab`;
