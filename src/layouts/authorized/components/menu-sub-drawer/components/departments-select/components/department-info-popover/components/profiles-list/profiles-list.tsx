import React, { ReactNode } from "react";
import { List, Spin, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Item } from "./item";
import { getRsqlParams, useFetch } from "../../../../../../../../../../utils";
import {
  ProfileInfoEntityProps,
  urls,
  USER_ROLES_ID,
} from "../../../../../../../../../../constants";

interface ProfilesListProps {
  departmentId: string;
}

const Empty: React.FC<{ loading?: boolean; children?: ReactNode }> = ({
  loading = false,
  children = null,
}) => (
  <Spin spinning={loading}>
    <div style={{ width: 200, minHeight: 45, height: "auto" }}>{children}</div>
  </Spin>
);

export const ProfilesList: React.FC<ProfilesListProps> = ({ departmentId }) => {
  const [t] = useTranslation("departments");

  const [chiefs, chiefsLoading] = useFetch<ProfileInfoEntityProps[]>({
    url: urls.userProfiles.entity,
    params: {
      query: getRsqlParams([
        { key: "departmentId", value: departmentId },
        { key: "userRoleId", value: USER_ROLES_ID.ROLE_DEPT_CHIEF },
      ]),
    },
  });

  const [deputies, deputiesLoading] = useFetch<ProfileInfoEntityProps[]>({
    url: urls.userProfiles.entity,
    params: {
      query: getRsqlParams([
        { key: "departmentId", value: departmentId },
        { key: "userRoleId", value: USER_ROLES_ID.ROLE_SUB_DEPT_CHIEF },
      ]),
    },
  });

  if (chiefsLoading || deputiesLoading) {
    return <Empty loading />;
  }

  if (!chiefs.length && !deputies.length) {
    return (
      <Empty>
        <Typography.Text>{t("chiefs.not.found")}</Typography.Text>
      </Empty>
    );
  }

  return (
    <List itemLayout="vertical">
      {chiefs.map((userProfile) => (
        <List.Item style={{ padding: "8px 0" }} key={userProfile.id}>
          <Item
            title={t("tooltip.chiefs.title")}
            fullName={userProfile.fullName}
            phone={userProfile.phone}
          />
        </List.Item>
      ))}
      {deputies.map((userProfile) => (
        <List.Item style={{ padding: "8px 0" }} key={userProfile.id}>
          <Item
            key={userProfile.id}
            title={t("tooltip.deputies.title")}
            fullName={userProfile.fullName}
            phone={userProfile.phone}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ProfilesList;
