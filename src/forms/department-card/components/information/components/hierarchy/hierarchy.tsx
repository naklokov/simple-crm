import { Breadcrumb, Tag, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../../components";
import {
  DepartmentEntityProps,
  FORM_NAMES,
  urls,
} from "../../../../../../constants";
import { useFetch, getFullUrl, useFormValues } from "../../../../../../utils";
import { getDepartmentHierarchy } from "../../../../utils";

export const Hierarchy = () => {
  const [t] = useTranslation("departmentInformation");
  const [departments, , reload] = useFetch<DepartmentEntityProps[]>({
    url: urls.departments.entity,
    cache: true,
  });
  const [department] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  useEffect(() => {
    reload();
  }, [reload, department]);

  const departmentsHierarchy = useMemo(
    () => getDepartmentHierarchy(department.id, departments),
    [departments, department]
  );

  const hierarchy = (
    <Breadcrumb>
      {departmentsHierarchy.map(({ id, departmentName: title }) => (
        <Breadcrumb.Item key={id}>
          {id === department.id ? (
            <Tag style={{ fontSize: 14 }} color="green">
              {title}
            </Tag>
          ) : (
            <Link to={getFullUrl(urls.departments.path, id)}>{title}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );

  return (
    <>
      <Typography.Text style={{ display: "block", marginBottom: "8px" }}>
        {t("hierarchy.title")}
      </Typography.Text>
      {departmentsHierarchy.length ? (
        hierarchy
      ) : (
        <Skeleton.Input
          style={{ marginTop: "3px", display: "block", width: "300px" }}
        />
      )}
    </>
  );
};

export default Hierarchy;
