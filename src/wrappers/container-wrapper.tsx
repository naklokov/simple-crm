import React, { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import { Loader } from "../components";
import { State, ProfileInfoEntityProps, urls } from "../constants";
import { useFetch } from "../utils";
import { setProfileInfo, setPermissions, setTheme } from "../__data__";

interface ContainerWrapperProps {
  children: ReactNode;
}

interface CredentialsProps {
  permissions: string[];
  roles: string[];
}

export const ContainerWrapper = ({ children }: ContainerWrapperProps) => {
  const dispatch = useDispatch();
  const error = useSelector((state: State) => state?.app?.error);

  const { permissions, profileInfo } = useSelector(
    (state: State) => state?.persist
  );

  const [profile] = useFetch<ProfileInfoEntityProps>({
    url: urls.profile.entity,
    initial: {},
  });

  const [credentials] = useFetch<CredentialsProps>({
    url: urls.profile.credentials,
  });

  useEffect(() => {
    dispatch(setTheme("light"));
    dispatch(setProfileInfo(profile));
    dispatch(setPermissions(credentials?.permissions ?? []));
  }, [credentials, profile, dispatch]);

  const loading = useMemo(() => isEmpty(profileInfo) || isEmpty(permissions), [
    profileInfo,
    permissions,
  ]);

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

  return <>{children}</>;
};

export default ContainerWrapper;
