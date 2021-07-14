import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { PagePermissionsChecker } from "../../wrappers";
import {
  PERMISSIONS,
  State,
  ProfileInfoEntityProps,
  formConfig,
  BREADCRUMB_ROUTES,
} from "../../constants";
import { profile } from "./tabs";
import { getItemRender, useTabs } from "../../utils";
import { FormHeader } from "../../components";

const {
  profile: {
    FORM: { tabs },
  },
} = formConfig;

interface ProfileProps {
  profileInfo: ProfileInfoEntityProps;
}

const formsMap: {
  [key: string]: (props: any) => any;
} = {
  profile,
};

export const Profile = ({ profileInfo }: ProfileProps) => {
  const { activeTab, onChange } = useTabs(tabs);

  const breadcrumb = {
    routes: BREADCRUMB_ROUTES.CLIENTS,
    itemRender: getItemRender,
  };

  const avatar = {
    size: 64,
    src: profileInfo.avatar,
    icon: <UserOutlined />,
  };

  const Form = formsMap[activeTab?.tabCode];

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.USERPROFILES["GET.ALL"]]}
    >
      <>
        <FormHeader
          avatar={avatar}
          title={profileInfo.fullName}
          breadcrumb={breadcrumb}
          footer={
            <Tabs onChange={onChange}>
              {tabs.map(({ tabName, tabCode }) => (
                <Tabs.TabPane key={tabCode} tab={tabName} />
              ))}
            </Tabs>
          }
        />
        {Form && <Form tab={activeTab} />}
      </>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Profile);
