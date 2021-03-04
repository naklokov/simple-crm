import React, { ReactNode, useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { State, ProfileInfoProps, ErrorAppState, urls } from "../constants";
import { useFetch, useFetchPersonalClients } from "../utils";
import { setLoading, setProfileInfo, setPermissions } from "../__data__";
import { Redirect } from "react-router";
import { isEmpty } from "lodash";
import { ClientsPersonalContext } from "../components/table/utils";

interface ContainerWrapperProps {
  children: ReactNode;
  permissions: string[];
  error: ErrorAppState;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setPermissions: (permissions: string[]) => void;
  setProfileInfo: (profile: ProfileInfoProps) => void;
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
      setPermissions,
      setProfileInfo,
      setLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContainerWrapper);
