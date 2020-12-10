import React, { ReactNode, useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { connect } from "react-redux";
import {
  State,
  ProfileInfoProps,
  ErrorAppState,
  TaskEntityProps,
  TASK_STATUSES,
  urls,
} from "../constants";
import { defaultErrorHandler, useFetch, getRsqlParams } from "../utils";
import {
  setLoading,
  setProfileInfo,
  setPermissions,
  setActiveTasks,
} from "../__data__";
import { Redirect } from "react-router";
import { getCompletedTasksRsql } from "../forms/tasks/utils";
import { isEmpty } from "lodash";

interface ContainerWrapperProps {
  children: ReactNode;
  profileInfo: ProfileInfoProps;
  permissions: string[];
  error: ErrorAppState;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setActiveTasks: (tasks: TaskEntityProps[]) => void;
  setPermissions: (permissions: string[]) => void;
  setProfileInfo: (profile: ProfileInfoProps) => void;
}

export const ContainerWrapper = ({
  children,
  profileInfo,
  error,
  setLoading,
  setActiveTasks,
  setPermissions,
  setProfileInfo,
}: ContainerWrapperProps) => {
  const [tasksLoading, setTasksLoading] = useState(false);
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
      getCompletedTasksRsql(TASK_STATUSES.NOT_COMPLETED),
    ]);
    try {
      const responce = await axios.get(urls.tasks.entity, {
        params: { query },
      });
      setActiveTasks(responce?.data ?? []);
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    setProfileInfo(profileResponse?.data ?? {});
    setPermissions(permissionsResponse?.data?.permissions ?? []);

    if (!isEmpty(permissionsResponse?.data?.permissions)) {
      console.log("PERMISSIONS", permissionsResponse?.data?.permissions);
    }
  }, [profileResponse, permissionsResponse]);

  useEffect(() => {
    if (profileInfo.id) {
      fetchTasks(profileInfo.id);
    }
  }, [profileInfo.id]);

  useEffect(() => {
    const isLoaded = profileLoading || permissionsLoading || tasksLoading;
    setLoading(isLoaded);
  }, [profileLoading, permissionsLoading, tasksLoading, setLoading]);

  if (error.statusCode) {
    return (
      <Redirect
        to={{
          pathname: urls.error.path,
          state: { error },
        }}
      />
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
  permissions: state?.persist?.permissions,
  loading: state?.app?.loading,
  error: state?.app?.error,
  auth: state?.persist?.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setActiveTasks,
      setPermissions,
      setProfileInfo,
      setLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContainerWrapper);
