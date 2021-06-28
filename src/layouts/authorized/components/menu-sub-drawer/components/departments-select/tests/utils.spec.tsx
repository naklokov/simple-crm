import { DepartmentEntityProps } from "../../../../../../../constants";
import {
  findDepartmentsByDepartmentName,
  getAllowDropMap,
  getExpandedDepartments,
  getParentDepartments,
  getTreeData,
  getUpdatedDepartmentHierarchy,
  isAllowDrop,
} from "../utils";

const department: DepartmentEntityProps = {
  id: "12345",
  departmentHierarchy: "111.222.333",
  administratorId: "34444",
  departmentName: "test",
  creationDate: "2020-10-20T11:11:11",
  historyId: "12312312",
  isActive: true,
  isDeleted: false,
  isOwner: {
    DELETE: false,
    UPDATE: false,
  },
  updateDate: "1231231",
  _links: {
    self: {
      href: "/12312/1231",
    },
  },
};

test("getUpdatedDepartmentHierarchy", () => {
  expect(getUpdatedDepartmentHierarchy(department)).toBe(`111.222.333.12345`);
});

test("getParentDepartments", () => {
  expect(getParentDepartments(department?.departmentHierarchy)).toEqual(
    department?.departmentHierarchy?.split(".")
  );
});

test("getExpandedDepartments", () => {
  const department2 = {
    ...department,
    departmentHierarchy: "111.222.333.444.555",
  };

  expect(getExpandedDepartments([department, department2])).toEqual([
    "111",
    "222",
    "333",
    "444",
    "555",
  ]);
});

test("findDepartmentsByDepartmentName", () => {
  const department2 = {
    ...department,
    id: "2",
    departmentName: "test2",
  };

  const department3 = {
    ...department,
    id: "3",
    departmentName: "test3",
  };

  expect(
    findDepartmentsByDepartmentName("test", [
      department,
      department2,
      department3,
    ]).length
  ).toBe(3);

  expect(
    findDepartmentsByDepartmentName("test3", [
      department,
      department2,
      department3,
    ]).length
  ).toBe(1);
  expect(
    findDepartmentsByDepartmentName("test3", [
      department,
      department2,
      department3,
    ])[0].id
  ).toBe("3");
});

test("isAllowDrop recursive = false", () => {
  const allowDropMap = {
    "111": {
      id: "111",
      canUpdate: true,
      departmentHierarchy: "",
    },
    "222": {
      id: "222",
      canUpdate: true,
      departmentHierarchy: "111",
    },
    "333": {
      id: "333",
      canUpdate: true,
      departmentHierarchy: "111.222",
    },
  };

  // рекурсивный перенос (родителя в ребёнка)
  expect(isAllowDrop(allowDropMap, "333", "222")).toBe(false);
});

test("isAllowDrop usually with right = true", () => {
  const allowDropMap = {
    "111": {
      id: "111",
      canUpdate: true,
      departmentHierarchy: "",
    },
    "222": {
      id: "222",
      canUpdate: true,
      departmentHierarchy: "111",
    },
    "333": {
      id: "333",
      canUpdate: true,
      departmentHierarchy: "111.222",
    },
  };

  // обыч
  expect(isAllowDrop(allowDropMap, "111", "333")).toBe(true);
});

test("isAllowDrop without right target = false", () => {
  const allowDropMap = {
    "111": {
      id: "111",
      canUpdate: false,
      departmentHierarchy: "",
    },
    "222": {
      id: "222",
      canUpdate: true,
      departmentHierarchy: "111",
    },
    "333": {
      id: "333",
      canUpdate: true,
      departmentHierarchy: "111.222",
    },
  };

  expect(isAllowDrop(allowDropMap, "111", "333")).toBe(false);
});

test("isAllowDrop without right current = false", () => {
  const allowDropMap = {
    "111": {
      id: "111",
      canUpdate: true,
      departmentHierarchy: "",
    },
    "222": {
      id: "222",
      canUpdate: true,
      departmentHierarchy: "111",
    },
    "333": {
      id: "333",
      canUpdate: false,
      departmentHierarchy: "111.222",
    },
  };

  expect(isAllowDrop(allowDropMap, "111", "333")).toBe(false);
});

test("getAllowDropMap", () => {
  const department2 = {
    ...department,
    id: "222",
    departmentHierarchy: "111",
    isOwner: {
      DELETE: false,
      UPDATE: false,
    },
  };

  expect(getAllowDropMap([department, department2])).toEqual({
    [department.id]: {
      canUpdate: department.isOwner.UPDATE,
      departmentHierarchy: department.departmentHierarchy,
    },
    [department2.id]: {
      canUpdate: department2.isOwner.UPDATE,
      departmentHierarchy: department2.departmentHierarchy,
    },
  });
});

test("getTreeData", () => {
  const department1 = {
    ...department,
    id: "111",
    departmentHierarchy: "",
  };
  const department2 = {
    ...department,
    id: "222",
    departmentHierarchy: "111",
  };
  const department3 = {
    ...department,
    id: "333",
    departmentHierarchy: "111",
  };
  const department4 = {
    ...department,
    id: "444",
    departmentHierarchy: "111.222",
  };

  const treeData = getTreeData([
    department1,
    department2,
    department3,
    department4,
  ]);

  expect(treeData.length).toBe(1);
  expect(treeData[0].key).toBe(department1.id);

  expect(treeData?.[0]?.children?.length).toBe(2);
  expect(treeData?.[0]?.children?.[0]?.key).toBe("222");
  expect(treeData?.[0]?.children?.[1]?.key).toBe("333");

  expect(treeData?.[0]?.children?.[0]?.children?.length).toBe(1);
  expect(treeData?.[0]?.children?.[0]?.children?.[0]?.key).toBe("444");
});
