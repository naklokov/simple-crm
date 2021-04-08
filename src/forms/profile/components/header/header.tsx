import React from "react";
import { random } from "lodash";
import { Typography, Tabs } from "antd";
import { connect } from "react-redux";
import { Avatar } from "../../../../components";
import {
  State,
  ProfileInfoEntityProps,
  formConfig,
} from "../../../../constants";

import style from "./header.module.scss";

const {
  profile: {
    FORM: { tabs },
  },
} = formConfig;

const { TabPane } = Tabs;

interface HeaderProps {
  profileInfo: ProfileInfoEntityProps;
  onChangeTab: (key: string) => void;
}

// кастомный Header с фоновым рисунком и большой аватаркой
// не используется, но нужен как альтернативный вариант, пока не удаляем!

export const Header = ({ profileInfo, onChangeTab }: HeaderProps) => (
  <div className={style.container}>
    <div
      className={(style.background, style[`backgroundImage${random(1, 10)}`])}
    >
      <div className={style.avatar}>
        <Avatar src={profileInfo.avatar} size={218} />
      </div>
    </div>
    <div className={style.header}>
      <Typography.Title className={style.fio} level={2}>
        {profileInfo.fullName}
      </Typography.Title>

      <Tabs defaultActiveKey="1" className={style.tabs} onChange={onChangeTab}>
        {tabs.map(({ tabName }) => (
          <TabPane key={tabName} tab={tabName} />
        ))}
      </Tabs>
    </div>
  </div>
);

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Header);
