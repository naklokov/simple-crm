import React, { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import { Loader } from "../components";
import {
  State,
  ProfileInfoEntityProps,
  urls,
  COLOR_THEME_FIELD,
  ThemeType,
} from "../constants";
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
  const persistTheme = useSelector((state: State) => state?.persist?.theme);

  const { permissions, profileInfo } = useSelector(
    (state: State) => state?.persist
  );

  const [profile] = useFetch<ProfileInfoEntityProps>({
    url: urls.profile.entity,
    initial: {},
  });

  const [settings] = useFetch<{ [COLOR_THEME_FIELD]: ThemeType }>({
    url: urls.settings.entity,
    initial: {},
  });

  const [credentials] = useFetch<CredentialsProps>({
    url: urls.profile.credentials,
  });

  useEffect(() => {
    dispatch(setProfileInfo(profile));
    dispatch(setPermissions(credentials?.permissions ?? []));
    dispatch(setTheme(settings?.[COLOR_THEME_FIELD]));
  }, [credentials, profile, settings, dispatch]);

  console.log(persistTheme);

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
