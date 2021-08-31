import React, { useCallback, useEffect } from "react";
import { Typography, Dropdown, Menu, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";

import { connect, useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import style from "./profile.module.scss";
import { getFullUrl, logout } from "../../../../utils";
import {
  urls,
  ProfileInfoEntityProps,
  State,
  TOOLTIP_SHOW_DELAY,
} from "../../../../constants";
import { Avatar } from "../../../../components";
import { DownIcon } from "../../../../assets/icons";

interface ProfileProps {
  profileInfo: ProfileInfoEntityProps;
}

export const Profile = ({ profileInfo }: ProfileProps) => {
  const [t] = useTranslation("authorizedLayout");
  const dispatch = useDispatch();
  const { fullName, avatar, id } = profileInfo || {};

  const profilePath = getFullUrl(urls.profile.path, id);

  const handleClickLogout = useCallback(() => {
    logout(dispatch);
  }, [dispatch]);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={profilePath}>{t("profile.view")}</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={urls.settings.path}>{t("settings")}</Link>
      </Menu.Item>
      <Menu.Item onClick={handleClickLogout}>{t("profile.logout")}</Menu.Item>
    </Menu>
  );

  if (!fullName) {
    return null;
  }

  return (
    <div className={style.container}>
      <Link to={profilePath}>
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
          <DownIcon />
        </div>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Profile);
