import React, { Component, useState } from "react";
import { Layout, Typography, Tabs } from "antd";
import { connect } from "react-redux";
import { State, ProfileInfoProps } from "../../__data__/interfaces";
import { Header } from "./components";

import style from "./profile.module.scss";
import { TABS_CONTENT, TABS_MAP } from "./constansts";
import { relative } from "path";

const { TabPane } = Tabs;

interface ProfileProps {
  profileInfo: ProfileInfoProps;
}

export const Profile = ({ profileInfo }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState(TABS_CONTENT[0].id);

  const handleChangeTab = (key: string) => {
    setActiveTab(key);
  };

  const Form = TABS_MAP[activeTab];

  return (
    <div className={style.container}>
      <Header onChangeTab={handleChangeTab} />
      <Form />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Profile);
