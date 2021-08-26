import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs } from "antd";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PagePermissionsChecker } from "../../wrappers";
import {
  PERMISSIONS,
  ProfileInfoEntityProps,
  formConfig,
  BREADCRUMB_ROUTES,
  QueryProps,
  urls,
  FORM_NAMES,
  TabProps,
} from "../../constants";
import { ProfileMain, Personalization } from "./tabs";
import {
  defaultErrorHandler,
  fillLinks,
  getFullUrl,
  getItemLoadingRender,
  getItemRender,
  useFormValues,
  useTabs,
} from "../../utils";
import { FormHeader, Skeleton } from "../../components";
import { setFormLoading } from "../../__data__";
import { UserIcon } from "../../assets/icons";

interface FormProps {
  formName: string;
  tab: TabProps;
}

const {
  profile: {
    FORM: { tabs },
  },
} = formConfig;

const formsMap: {
  [key: string]: ({ formName, tab }: FormProps) => any;
} = {
  profileMain: ProfileMain,
  personalization: Personalization,
};

export const Profile = () => {
  const { activeTab, onChange } = useTabs(tabs);
  const dispatch = useDispatch();
  const { id: userProfileId } = useParams<QueryProps>();

  const [userProfile, setUserProfile] = useFormValues<ProfileInfoEntityProps>(
    FORM_NAMES.PROFILE
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      dispatch(setFormLoading({ name: FORM_NAMES.PROFILE, loading: true }));
      try {
        const url = getFullUrl(urls.userProfiles.entity, userProfileId);
        const response = await axios.get(url);
        setUserProfile(response?.data);
      } catch (error) {
        defaultErrorHandler({
          error,
        });
      } finally {
        dispatch(setFormLoading({ name: FORM_NAMES.PROFILE, loading: false }));
      }
    };

    fetchUserProfile();
  }, [dispatch, userProfileId, setUserProfile]);

  useEffect(
    () => () => {
      setUserProfile();
    },
    [setUserProfile]
  );

  const breadcrumb = {
    routes: [
      ...BREADCRUMB_ROUTES.PROFILE,
      {
        path: `/${userProfile?.id ?? ""}`,
        breadcrumbName: userProfile?.fullName ?? "",
      },
    ],
    itemRender: userProfile?.id ? getItemRender : getItemLoadingRender,
  };

  const avatar = {
    size: 64,
    src: userProfile.avatar,
    icon: userProfile?.id ? <UserIcon /> : <Skeleton.Avatar size="large" />,
  };

  const Form = formsMap[activeTab?.tabCode];
  const modifyTab = useMemo(
    () => ({
      ...activeTab,
      _links: fillLinks(activeTab._links, { userProfileId }),
    }),
    [activeTab, userProfileId]
  );

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.USERPROFILES["GET.ALL"]]}
    >
      <>
        <FormHeader
          avatar={avatar}
          title={userProfile?.fullName || <Skeleton.Title />}
          breadcrumb={breadcrumb}
          footer={
            <Tabs onChange={onChange}>
              {tabs.map(({ tabName, tabCode }) => (
                <Tabs.TabPane key={tabCode} tab={tabName} />
              ))}
            </Tabs>
          }
        />
        {Form && <Form tab={modifyTab} formName={FORM_NAMES.PROFILE} />}
      </>
    </PagePermissionsChecker>
  );
};

export default Profile;
