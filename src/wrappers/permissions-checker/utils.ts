import isEmpty from "lodash/isEmpty";
import { State } from "../../__data__/interfaces";
import { loadState } from "../../utils/local-storage";

// если ничего не передано в доступные роли, то считаем что компонент доступен
export const hasPermission = (available: string[], all: string[]) =>
  isEmpty(available) ||
  isEmpty(all) ||
  all.some((permission) => available.includes(permission));

// метод фильтра массива элементов по пропсу permissions.
// штука временная до той поры, пока бек не начнёт нам сам передавать эти массивы полей
export const filterArrayByPermissions = (array: any[]) => {
  const state: State = loadState();
  const all = state?.persist?.permissions ?? [];
  return array.filter((item) => hasPermission(all, item.permissions));
};
