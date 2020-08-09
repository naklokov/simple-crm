import React, { useEffect } from "react";
import axios from "axios";
import { Avatar, Typography, Dropdown, Menu } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { logout, logger } from "../../../../utils";
import { Dispatch } from "@reduxjs/toolkit";
import { setProfileInfo, setLoading } from "../../../../__data__";
import { connect } from "react-redux";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";

import style from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import { urls, http } from "../../../../constants";

interface ProfileProps {
  profileInfo: ProfileInfoProps;
  setProfile: (profileInfo: object) => void;
  setLoading: (loading: boolean) => void;
}

export const Profile = ({
  profileInfo,
  setProfile,
  setLoading,
}: ProfileProps) => {
  const [t] = useTranslation("authorizedLayout");
  const { secondName, firstName, avatar } = profileInfo;

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(urls.profile.info);
      setProfile(responce?.data ?? {});

      logger.debug({
        message: t("profile.get.success"),
      });
    } catch (error) {
      logger.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={urls.profile.path}>{t("profile.view")}</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>{t("profile.logout")}</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Link to="/">
        <Avatar src={avatar} icon={<UserOutlined />} />
      </Link>
      <Dropdown overlay={menu}>
        <div className={style.dropdownContainer}>
          <Typography.Text
            strong
          >{`${secondName} ${firstName}`}</Typography.Text>
          <DownOutlined />
        </div>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profileInfo: ProfileInfoProps) => {
    dispatch(setProfileInfo(profileInfo));
  },
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
