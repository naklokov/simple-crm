import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { Loader } from "../../components";
import { Logo, Menu, Profile } from "./components";
import { State, ProfileInfoProps } from "../../__data__/interfaces";

import style from "./authorized.module.scss";
import {
  setMenuCollapsed,
  setLoading as setLoadingAction,
  setProfileInfo,
  setPermissions as setPermissionsAction,
} from "../../__data__";
import { urls } from "../../constants";
import { useTranslation } from "react-i18next";
import { logger, defaultErrorHandler } from "../../utils";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: JSX.Element;
  subheader?: JSX.Element;
  loading: boolean;
  isMenuCollapsed: boolean;
  profileInfo: ProfileInfoProps;
  setCollapsed: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPermissions: (permissions: string[]) => void;
  setProfile: (profile: ProfileInfoProps) => void;
}

export const Authorized = ({
  children,
  subheader,
  loading,
  isMenuCollapsed,
  setCollapsed,
  profileInfo,
  setProfile,
  setPermissions,
  setLoading,
}: AuthorizedProps) => {
  const [t] = useTranslation("authorizedLayout");

  const fetchProfile = async () => {
    try {
      const responce = await axios.get(urls.profile.info);
      setProfile(responce?.data ?? {});

      logger.debug({
        message: t("profile.success"),
      });
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("profile.error"),
      });
    }
  };

  const fetchPermissions = async () => {
    try {
      const responce = await axios.get(urls.profile.permissions);
      // TODO Выпилить при релизе
      console.log("user permissions", responce?.data?.permissions);
      setPermissions(responce?.data?.permissions ?? []);
      logger.debug({
        message: t("permissions.success"),
      });
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("permissions.error"),
      });
    }
  };

  const handleCollapseMenu = () => {
    setCollapsed(!isMenuCollapsed);
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetchProfile();
      fetchPermissions();
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Layout className={style.main}>
        <Sider
          collapsible
          collapsed={isMenuCollapsed}
          theme="light"
          className={style.sider}
          onCollapse={handleCollapseMenu}
        >
          <Logo collapsed={isMenuCollapsed} />
          <Menu collapsed={isMenuCollapsed} />
        </Sider>
        <Layout>
          <Header className={style.header}>
            <div className={style.profile}>
              <Profile profileInfo={profileInfo} />
            </div>
          </Header>
          {subheader && <div className={style.subheader}>{subheader}</div>}
          <Content className={style.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
  loading: state?.app?.loading,
  isMenuCollapsed: state?.persist?.menuCollapsed,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCollapsed: (value: boolean) => {
    dispatch(setMenuCollapsed(value));
  },
  setPermissions: (permissions: string[]) => {
    dispatch(setPermissionsAction(permissions));
  },
  setProfile: (profileInfo: ProfileInfoProps) => {
    dispatch(setProfileInfo(profileInfo));
  },
  setLoading: (loading: boolean) => dispatch(setLoadingAction(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
