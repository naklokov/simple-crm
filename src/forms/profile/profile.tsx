import React, { useState } from "react";
import { connect } from "react-redux";
import { Header } from "./components";

import style from "./profile.module.scss";

import { TABS_CONTENT, TABS_MAP } from "./constansts";
import { PagePermissionsChecker } from "../../wrappers";
import { PERMISSIONS, State, ProfileInfoEntityProps } from "../../constants";

interface ProfileProps {
  profileInfo: ProfileInfoEntityProps;
}

export const Profile = ({ profileInfo }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState(TABS_CONTENT[0].id);

  const handleChangeTab = (key: string) => {
    setActiveTab(key);
  };

  const Form = TABS_MAP[activeTab];

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.USERPROFILES["GET.ALL"]]}
    >
      <div className={style.container}>
        <Header onChangeTab={handleChangeTab} />
        <Form />
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Profile);
