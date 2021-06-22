import { DepartmentEntityProps } from "../../constants";
import { getHierarchyParentId, pluralize } from "../../utils";

export const getDepartmentHierarchy = (
  targetId: string,
  departments: DepartmentEntityProps[]
) => {
  let hierarchy: DepartmentEntityProps[] = [];
  const departmentsMap: {
    [id: string]: DepartmentEntityProps;
  } = departments.reduce(
    (acc, dep) => ({
      ...acc,
      [dep.id]: dep,
    }),
    {}
  );
  const rootDepartment = departmentsMap[targetId];

  if (rootDepartment) {
    hierarchy = [rootDepartment];
    let parentId = getHierarchyParentId(rootDepartment?.departmentHierarchy);

    while (parentId) {
      const parentDepartment = departmentsMap[parentId];
      hierarchy = [parentDepartment, ...hierarchy];

      parentId = getHierarchyParentId(parentDepartment.departmentHierarchy);
    }
  }

  return hierarchy;
};

export const getTotalCompanies = (total: number) =>
  pluralize(total, [
    `Всего ${total} компания`,
    `Всего ${total} компании`,
    `Всего ${total} компаний`,
  ]);
