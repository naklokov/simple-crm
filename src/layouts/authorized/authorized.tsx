import React, { ReactNode, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Layout, Space } from "antd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { About, Logo, Menu, Profile } from "./components";
import {
  State,
  ProfileInfoProps,
  ErrorAppState,
} from "../../__data__/interfaces";

import style from "./authorized.module.scss";
import {
  setLoading,
  setProfileInfo,
  setPermissions,
  setTasks,
} from "../../__data__";
import { TaskEntityProps, urls } from "../../constants";
import { useTranslation } from "react-i18next";
import {
  logger,
  defaultErrorHandler,
  useFetch,
  getRsqlParams,
} from "../../utils";
import { Loader } from "../../components";
import { Redirect } from "react-router";
import { isEmpty } from "lodash";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
  loading: boolean;
  profileInfo: ProfileInfoProps;
  tasks: TaskEntityProps[];
  error: ErrorAppState;
  setLoading: (loading: boolean) => void;
  setTasks: (tasks: TaskEntityProps[]) => void;
  setPermissions: (permissions: string[]) => void;
  setProfileInfo: (profile: ProfileInfoProps) => void;
}

export const Authorized = ({
  children,
  loading,
  profileInfo,
  setTasks,
  setProfileInfo,
  setPermissions,
  setLoading,
  error,
}: AuthorizedProps) => {
  const [t] = useTranslation("authorizedLayout");
  const [tasksLoading, setTasksLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { response: profileResponse, loading: profileLoading } = useFetch({
    url: urls.profile.entity,
  });

  const {
    response: permissionsResponse,
    loading: permissionsLoading,
  } = useFetch({
    url: urls.profile.permissions,
  });

  const fetchTasks = async (userProfileId: string) => {
    setTasksLoading(true);
    const query = getRsqlParams([
      { key: "userProfileId", value: userProfileId },
    ]);
    try {
      const responce = await axios.get(urls.tasks.entity, {
        params: { query },
      });
      setTasks(responce?.data ?? []);
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    setLoading(profileLoading || permissionsLoading || tasksLoading);
  }, [profileLoading, permissionsLoading, tasksLoading]);

  useEffect(() => {
    setProfileInfo(profileResponse?.data ?? {});
    setPermissions(permissionsResponse?.data?.permissions ?? []);
  }, [profileResponse, permissionsResponse]);

  useEffect(() => {
    if (profileInfo.id) {
      fetchTasks(profileInfo.id);
    }
  }, [profileInfo.id]);

  const handleCollapseMenu = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

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
        collapsed={collapsed}
        theme="light"
        className={style.sider}
        onCollapse={handleCollapseMenu}
      >
        <Logo collapsed={collapsed} />
        <Menu />
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
  profileInfo: state?.data?.profileInfo ?? {},
  tasks: state?.data?.tasks ?? {},
  loading: state?.app?.loading,
  error: state?.app?.error ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setTasks,
      setPermissions,
      setProfileInfo,
      setLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
