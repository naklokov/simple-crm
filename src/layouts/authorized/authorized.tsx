import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

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
import { Loader } from "../../components";
import { isEmpty } from "lodash";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: JSX.Element;
  subheader?: JSX.Element;
  loading: boolean;
  isMenuCollapsed: boolean;
  profileInfo: ProfileInfoProps;
  permissions: string[];
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
  permissions,
  setProfile,
  setPermissions,
  setLoading,
}: AuthorizedProps) => {
  const [t] = useTranslation("authorizedLayout");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(urls.profile.entity);
      setProfile(responce?.data ?? {});

      logger.debug({
        message: t("profile.success"),
      });
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("profile.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCollapseMenu = () => {
    setCollapsed(!isMenuCollapsed);
  };

  useEffect(() => {
    if (isEmpty(profileInfo)) {
      fetchProfile();
    }

    if (isEmpty(permissions)) {
      fetchPermissions();
    }
  }, []);

  return (
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
        <Content>{children}</Content>
        {loading && <Loader />}
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
  permissions: state?.persist?.permissions ?? {},
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
