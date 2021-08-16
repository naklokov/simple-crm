import React, { Key, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { union } from "lodash";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  useFetch,
} from "../../../../../../utils";
import { DepartmentEntityProps, urls } from "../../../../../../constants";

import { DepartmentsTree } from "./components";
import {
  findDepartmentsByDepartmentName,
  getExpandedDepartments,
  getUpdatedDepartmentHierarchy,
} from "./utils";
import { SearchBar } from "../../../../../../components";

export const DepartmentsSelect = () => {
  const [t] = useTranslation("departmentsDrawer");
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  const [departments, loading, reload] = useFetch<DepartmentEntityProps[]>({
    url: urls.departments.entity,
    cache: true,
  });

  // сделать все отделы раскрытыми по умолчанию
  useEffect(() => {
    const expanded = departments.map(({ id }) => id);
    setExpandedKeys(expanded);
  }, [departments]);

  const [value, setValue] = useState("");
  const [searched, setSearched] = useState("");

  const handleSearch = useCallback(
    (input) => {
      setSearched(input);

      const finded = findDepartmentsByDepartmentName(input, departments);
      const expanded = getExpandedDepartments(finded);

      if (expanded.length) {
        // чтобы уже раскрытые отделы не "схлопнулись"
        setExpandedKeys((keys) => union(expanded, keys));
      }
    },
    [departments]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const handleExpand = useCallback((values: Key[]) => {
    setExpandedKeys(values);
  }, []);

  const handleDropDepartment = useCallback(
    async (dropNode, dropDepartment, targetDepartment) => {
      const departmentHierarchy = getUpdatedDepartmentHierarchy(
        targetDepartment
      );

      if (departmentHierarchy !== dropDepartment?.departmentHierarchy) {
        const updatedDepartment = {
          ...dropDepartment,
          departmentHierarchy,
        };

        try {
          const url = getFullUrl(urls.departments.entity, updatedDepartment.id);
          await axios.put(url, updatedDepartment);
          defaultSuccessHandler(t("move.message.success"));
          reload();
        } catch (error) {
          defaultErrorHandler({
            error,
          });
        }
      }
    },
    [t, reload]
  );

  return (
    <>
      <SearchBar
        style={{ padding: "16px 24px" }}
        className="background-gray"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <DepartmentsTree
        loading={loading}
        departments={departments}
        onExpand={handleExpand}
        expandedKeys={expandedKeys}
        onDrop={handleDropDepartment}
        searched={searched}
      />
    </>
  );
};

export default DepartmentsSelect;
