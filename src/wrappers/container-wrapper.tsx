import React, { ReactNode, useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import { Loader } from "../components";
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
import { setProfileInfo, setPermissions } from "../__data__";

interface ContainerWrapperProps {
  children: ReactNode;
  error: ErrorAppState;
}

interface CredentialsProps {
  permissions: string[];
  roles: string[];
}

export const ContainerWrapper = ({
  children,
  error,
}: ContainerWrapperProps) => {
  const dispatch = useDispatch();
  const [profile] = useFetch<ProfileInfoEntityProps>({
    url: urls.profile.entity,
    initial: {},
  });

  const [credentials] = useFetch<CredentialsProps>({
    url: urls.profile.credentials,
  });

  const personalClients = useFetchPersonalClients();

  useEffect(() => {
    dispatch(setProfileInfo(profile));
    dispatch(setPermissions(credentials?.permissions ?? []));
  }, [credentials, profile, dispatch]);

  const loading = useMemo(
    () => isEmpty(profile) || isEmpty(credentials?.permissions),
    [profile, credentials?.permissions]
  );

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

  if (loading) {
    return <Loader />;
  }

  return (
    <ClientsPersonalContext.Provider value={personalClients}>
      {children}
    </ClientsPersonalContext.Provider>
  );
};

const mapStateToProps = (state: State) => ({
  error: state?.app?.error,
});

export default connect(mapStateToProps)(ContainerWrapper);
