import React from "react";
import { Avatar, Typography, Dropdown, Menu, Skeleton } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { logout as logoutMethod } from "../../../../utils";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { ProfileInfoProps } from "../../../../__data__/interfaces";

import style from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import { urls } from "../../../../constants";
import { isEmpty } from "lodash";

interface ProfileProps {
  profileInfo: ProfileInfoProps;
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

  return (
    <div className={style.container}>
      <Link to={urls.profile.path}>
        <Avatar src={avatar} icon={<UserOutlined />} />
      </Link>
      <Dropdown overlay={menu}>
        <div className={style.dropdownContainer}>
          <Typography.Text strong>{fullName}</Typography.Text>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => logoutMethod(dispatch),
});

export default connect(null, mapDispatchToProps)(Profile);
