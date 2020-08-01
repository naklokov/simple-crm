import React from "react";
import { Avatar } from "../../../../components";
import { Typography, Tabs } from "antd";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { TABS_CONTENT } from "../../constansts";

import style from "./header.module.scss";

const { TabPane } = Tabs;

interface HeaderProps {
  profileInfo: ProfileInfoProps;
  onChangeTab: (key: string) => void;
}

export const Header = ({ profileInfo, onChangeTab }: HeaderProps) => (
  <div className={style.container}>
    <div className={style.background}>
      <div className={style.avatar}>
        <Avatar src={profileInfo.avatar} size={218} />
      </div>
    </div>
    <div className={style.header}>
      <Typography.Title
        className={style.fio}
        level={2}
      >{`${profileInfo.secondName} ${profileInfo.firstName}`}</Typography.Title>

      <Tabs defaultActiveKey="1" className={style.tabs} onChange={onChangeTab}>
        {TABS_CONTENT.map(({ id, title }) => (
          <TabPane key={id} tab={title} />
        ))}
      </Tabs>
    </div>
  </div>
);

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Header);
