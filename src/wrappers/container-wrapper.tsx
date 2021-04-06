import React, { ReactNode, useEffect } from "react";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import {
  State,
  ProfileInfoEntityProps,
  ErrorAppState,
  urls,
} from "../constants";
import {
  ClientsPersonalContext,
  useFetch,
  useFetchPersonalClients,
} from "../utils";
import {
  setLoading as setLoadingAction,
  setProfileInfo as setProfileInfoAction,
  setPermissions as setPermissionsAction,
} from "../__data__";

interface ContainerWrapperProps {
  children: ReactNode;
  error: ErrorAppState;
  setLoading: (loading: boolean) => void;
  setPermissions: (permissions: string[]) => void;
  setProfileInfo: (profile: ProfileInfoEntityProps) => void;
}

export const ContainerWrapper = ({
  children,
  error,
  setLoading,
  setPermissions,
  setProfileInfo,
}: ContainerWrapperProps) => {
  const { response: profileResponse, loading: profileLoading } = useFetch({
    url: urls.profile.entity,
  });

  const {
    response: permissionsResponse,
    loading: permissionsLoading,
  } = useFetch({
    url: urls.profile.permissions,
  });

  const personalClients = useFetchPersonalClients();

  useEffect(() => {
    setProfileInfo(profileResponse?.data ?? {});
    setPermissions(permissionsResponse?.data?.permissions ?? []);

    if (!isEmpty(permissionsResponse?.data?.permissions)) {
      // eslint-disable-next-line
      console.log("PERMISSIONS", permissionsResponse?.data?.permissions);
    }
  }, [profileResponse, permissionsResponse, setProfileInfo, setPermissions]);

  useEffect(() => {
    const isLoaded = profileLoading || permissionsLoading;
    setLoading(isLoaded);
  }, [profileLoading, permissionsLoading, setLoading]);

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

  return (
    <ClientsPersonalContext.Provider value={personalClients}>
      {children}
    </ClientsPersonalContext.Provider>
  );
};

const mapStateToProps = (state: State) => ({
  permissions: state?.persist?.permissions,
  loading: state?.app?.loading,
  error: state?.app?.error,
  auth: state?.persist?.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setPermissions: setPermissionsAction,
      setProfileInfo: setProfileInfoAction,
      setLoading: setLoadingAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContainerWrapper);
