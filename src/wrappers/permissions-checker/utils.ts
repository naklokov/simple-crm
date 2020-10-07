import isEmpty from "lodash/isEmpty";

const OWNER_POSTFIX = ".OWNER";

export const hasPermission = (available: string[], all: string[]) =>
  isEmpty(available) ||
  isEmpty(all) ||
  all.some((permission) => available.includes(permission));

// если ничего не передано в доступные роли, то считаем что компонент доступен
export const checkAllow = (available: string[], all: string[]) => {
  const currentPermissions = all.filter((o) => available.includes(o));

  return (
    isEmpty(available) ||
    isEmpty(all) ||
    currentPermissions.some((o) => !o.endsWith(OWNER_POSTFIX))
  );
};

export const checkOwner = (
  available: string[],
  all: string[],
  isOwner: boolean
) => {
  const currentPermissions = all.filter((o) => available.includes(o));
  return currentPermissions.some((o) => o.endsWith(OWNER_POSTFIX)) && isOwner;
};

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
