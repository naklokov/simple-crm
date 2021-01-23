import isEmpty from "lodash/isEmpty";

export const hasPermission = (available: string[], all: string[]) =>
  isEmpty(available) ||
  isEmpty(all) ||
  available.some((permission) => all.includes(permission));

export const isCanShow = (
  availablePermissions: string[],
  allPermissions: string[],
  hasRight: boolean
) => hasPermission(availablePermissions, allPermissions) && hasRight;

// метод фильтра массива элементов по пропсу permissions.
// штука временная до той поры, пока бек не начнёт нам сам передавать эти массивы полей
export const filterArrayByPermissions = (
  array: any[],
  allPermissions: string[]
) => {
  return array.filter((item) =>
    hasPermission(allPermissions, item.permissions)
  );
};
