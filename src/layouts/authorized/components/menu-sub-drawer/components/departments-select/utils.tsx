import React from "react";
import { union } from "lodash";
import { DepartmentEntityProps } from "../../../../../../constants";
import { TreeDataProps } from "./constants";
import { getHierarchyParentId } from "../../../../../../utils";
import { DepartmentInfoPopover } from "./components";
import { HighlightTextWrapper } from "../../../../../../wrappers";

const DEPARMENT_HIERARCHY_DELIMETER = ".";

type AllowDropInfo = {
  canUpdate: boolean;
  departmentHierarchy: string;
};

interface AllowDropMapProps {
  [key: string]: AllowDropInfo;
}

export const getUpdatedDepartmentHierarchy = ({
  departmentHierarchy,
  id,
}: DepartmentEntityProps) =>
  departmentHierarchy
    ? `${departmentHierarchy}${DEPARMENT_HIERARCHY_DELIMETER}${id}`
    : id;

export const getParentDepartments = (departmentHierarchy?: string) =>
  departmentHierarchy?.split(DEPARMENT_HIERARCHY_DELIMETER) ?? [];

export const getExpandedDepartments = (departments: DepartmentEntityProps[]) =>
  departments.reduce(
    (acc, department) =>
      union(acc, getParentDepartments(department?.departmentHierarchy)),
    [] as string[]
  );

export const findDepartmentsByDepartmentName = (
  searched: string,
  departments: DepartmentEntityProps[]
) =>
  departments?.filter(({ departmentName }) =>
    departmentName?.toLowerCase()?.includes(searched?.toLowerCase())
  );

export const isAllowDrop = (
  allowDropMap: AllowDropMapProps,
  targetId?: string,
  currentId?: string
) => {
  if (currentId && targetId) {
    const targetInfo = allowDropMap[targetId];
    const currentInfo = allowDropMap[currentId];

    const isRecursive =
      targetInfo?.departmentHierarchy?.includes(currentId) ?? false;

    return !isRecursive && targetInfo?.canUpdate && currentInfo?.canUpdate;
  }

  return false;
};

export const getAllowDropMap = (departments: DepartmentEntityProps[]) =>
  departments.reduce(
    (acc, dept) => ({
      ...acc,
      [dept.id]: {
        canUpdate: dept?.isOwner?.UPDATE ?? false,
        departmentHierarchy: dept?.departmentHierarchy ?? "",
      },
    }),
    {} as AllowDropMapProps
  );

export const getTreeData = (
  departments: DepartmentEntityProps[],
  searched: string = ""
) => {
  const mappedDepartments: TreeDataProps[] = departments.map(
    ({ id, departmentName, departmentHierarchy }) => {
      const parentId = getHierarchyParentId(departmentHierarchy);

      return {
        key: id,
        title: (
          <DepartmentInfoPopover departmentId={id}>
            <div>
              <HighlightTextWrapper
                text={departmentName}
                searched={[searched.toLowerCase()]}
              />
            </div>
          </DepartmentInfoPopover>
        ),
        parentId,
      };
    }
  );

  const tree: TreeDataProps[] = [];
  const mappedArr: { [id: string]: TreeDataProps } = {};
  let arrElem: TreeDataProps;

  for (let i = 0, len = mappedDepartments.length; i < len; i++) {
    arrElem = mappedDepartments[i];
    mappedArr[arrElem.key] = arrElem;
    mappedArr[arrElem.key].children = [];
  }

  for (const key in mappedArr) {
    // eslint-disable-next-line
    if (mappedArr.hasOwnProperty(key)) {
      const { parentId, ...elem } = mappedArr[key];
      if (parentId) {
        mappedArr?.[parentId]?.children?.push(elem);
      } else {
        tree.push(elem);
      }
    }
  }
  return tree;
};
