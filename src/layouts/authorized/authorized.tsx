import React, { ReactNode, useEffect } from "react";
import axios from "axios";
import { Layout, Space } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { About, Logo, Menu, Profile } from "./components";
import {
  State,
  ProfileInfoProps,
  ErrorAppState,
} from "../../__data__/interfaces";

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
import { Redirect } from "react-router";
import { isEmpty } from "lodash";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
  loading: boolean;
  isMenuCollapsed: boolean;
  profileInfo: ProfileInfoProps;
  error: ErrorAppState;
  setCollapsed: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPermissions: (permissions: string[]) => void;
  setProfile: (profile: ProfileInfoProps) => void;
}

export const Authorized = ({
  children,
  loading,
  isMenuCollapsed,
  setCollapsed,
  profileInfo,
  setProfile,
  setPermissions,
  setLoading,
  error,
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
    fetchProfile();
    fetchPermissions();
  }, []);

  if (!isEmpty(error)) {
    return (
      <Redirect
        to={{
          pathname: urls.error.path,
          state: { error },
        }}
      />
    );
  }

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
          <Space size={16} style={{ float: "right" }}>
            <About />
            <Profile profileInfo={profileInfo} />
          </Space>
        </Header>
        <Content className={style.content}>{children}</Content>
        {loading && <Loader />}
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
  loading: state?.app?.loading,
  isMenuCollapsed: state?.app?.menuCollapsed,
  error: state?.app?.error ?? {},
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
