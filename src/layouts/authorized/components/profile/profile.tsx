import React from "react";
import { Avatar, Typography, Dropdown, Menu } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { logout } from "../../../../utils";
import style from "./profile.module.scss";

const getAvatar = () => {
  return "";
};

const getUser = () => ({
  firstName: "Василий",
  secondName: "Чапаев",
  middleName: "Иванович",
});

export const Profile = () => {
  const avatar = getAvatar();
  const user = getUser();
  const [t] = useTranslation("authorizedLayout");

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">{t("profile.view")}</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>{t("profile.logout")}</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Avatar src={avatar} icon={<UserOutlined />} />
      <Dropdown overlay={menu}>
        <div className={style.dropdownContainer}>
          <Typography.Text
            strong
          >{`${user.secondName} ${user.firstName}`}</Typography.Text>
          <DownOutlined />
        </div>
      </Dropdown>
    </React.Fragment>
  );
};

export default Profile;
