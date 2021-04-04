import React from "react";
import { Typography, Dropdown, Menu, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import { useTranslation } from "react-i18next";
import style from "./profile.module.scss";
import { logout as logoutMethod } from "../../../../utils";
import {
  urls,
  ProfileInfoEntityProps,
  State,
  TOOLTIP_SHOW_DELAY,
} from "../../../../constants";
import { Avatar } from "../../../../components";

interface ProfileProps {
  profileInfo: ProfileInfoEntityProps;
  logout: () => void;
}

export const Profile = ({ profileInfo, logout }: ProfileProps) => {
  const [t] = useTranslation("authorizedLayout");
  const { fullName, avatar } = profileInfo;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={urls.profile.path}>{t("profile.view")}</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>{t("profile.logout")}</Menu.Item>
    </Menu>
  );

  if (!fullName) {
    return null;
  }

  return (
    <div className={style.container}>
      <Link to={urls.profile.path}>
        <Tooltip
          mouseEnterDelay={TOOLTIP_SHOW_DELAY}
          title={t("tooltip.edit.profile")}
        >
          <Avatar src={avatar} />
        </Tooltip>
      </Link>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className={style.dropdownContainer}>
          <Typography.Text strong>{fullName}</Typography.Text>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => logoutMethod(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
