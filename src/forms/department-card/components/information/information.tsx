import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  DepartmentEntityProps,
  FORM_NAMES,
  urls,
  QueryProps,
  USER_ROLES_ID,
  ProfileInfoEntityProps,
  FormProps,
} from "../../../../constants";
import { getRsqlParams, useFetch, useFormValues } from "../../../../utils";
import { FormWrapper } from "../../../../wrappers";
import { Hierarchy, Fields, Role, RoleHeader, RoleFooter } from "./components";
import { useChangeRoleDrawer } from "./utils";

export const Information: React.FC<FormProps> = ({ tab, drawers }) => {
  const [t] = useTranslation("departmentInformation");
  const { id: departmentId } = useParams<QueryProps>();
  const [department] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const { fields = [] } =
    drawers.find(({ code }) => code === "changeRoleDrawer") ?? {};

  const [chiefs, chiefsLoading, chiefsReload] = useFetch<
    ProfileInfoEntityProps[]
  >({
    url: urls.userProfiles.entity,
    params: {
      query: getRsqlParams([
        { key: "departmentId", value: departmentId },
        { key: "userRoleId", value: USER_ROLES_ID.ROLE_DEPT_CHIEF },
      ]),
    },
  });

  const [deputies, deputiesLoading, deputiesReload] = useFetch<
    ProfileInfoEntityProps[]
  >({
    url: urls.userProfiles.entity,
    params: {
      query: getRsqlParams([
        { key: "departmentId", value: departmentId },
        { key: "userRoleId", value: USER_ROLES_ID.ROLE_SUB_DEPT_CHIEF },
      ]),
    },
  });

  const [chiefsDrawer, showChiefsDrawer] = useChangeRoleDrawer(
    t("chiefs.drawer.title"),
    fields,
    chiefsReload,
    t("chiefs.drawer.add.success"),
    { userRoleId: USER_ROLES_ID.ROLE_DEPT_CHIEF, departmentId }
  );

  const [deputiesDrawer, showDeputiesDrawer] = useChangeRoleDrawer(
    t("deputies.drawer.title"),
    fields,
    deputiesReload,
    t("deputies.drawer.add.success"),
    { userRoleId: USER_ROLES_ID.ROLE_SUB_DEPT_CHIEF, departmentId }
  );

  if (!department.id) {
    return (
      <FormWrapper name={FORM_NAMES.DEPARTMENT_CARD}>
        <div style={{ height: "150px" }} />
      </FormWrapper>
    );
  }

  const bottomOffset = { marginBottom: "24px" };
  const hasRight = department?.isOwner?.UPDATE;
  const showChiefs = hasRight || !!chiefs.length;
  const showDeputies = hasRight || !!deputies.length;

  return (
    <>
      <Row>
        <Col style={bottomOffset} span={24}>
          <Hierarchy />
        </Col>
        <Col span={24}>
          <Fields tab={tab} />
        </Col>
        {showChiefs && (
          <Col style={bottomOffset} span={24}>
            <Role
              drawer={chiefsDrawer}
              rowTitle={t("chiefs.row.title")}
              rows={chiefs}
              loading={chiefsLoading}
              onDelete={chiefsReload}
              header={<RoleHeader>{t("chiefs.title")}</RoleHeader>}
              footer={
                !chiefs.length && <RoleFooter onClick={showChiefsDrawer} />
              }
            />
          </Col>
        )}
        {showDeputies && (
          <Col span={24}>
            <Role
              drawer={deputiesDrawer}
              rowTitle={t("deputies.row.title")}
              rows={deputies}
              loading={deputiesLoading}
              onDelete={deputiesReload}
              header={<RoleHeader>{t("deputies.title")}</RoleHeader>}
              footer={<RoleFooter onClick={showDeputiesDrawer} />}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Information;
