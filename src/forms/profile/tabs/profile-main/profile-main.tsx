import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FORM_NAMES,
  ProfileInfoEntityProps,
  State,
  TabPaneFormProps,
} from "../../../../constants";

import { FieldsContainer } from "../../../../components";
import { useFormValues } from "../../../../utils";
import { setProfileInfo } from "../../../../__data__";

export const ProfileMain: React.FC<TabPaneFormProps> = ({ formName, tab }) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useFormValues<ProfileInfoEntityProps>(
    formName ?? FORM_NAMES.PROFILE
  );
  const personalUserProfile = useSelector(
    (state: State) => state?.persist?.profileInfo
  );

  const handleFinish = useCallback(
    (values: ProfileInfoEntityProps) => {
      if (values?.id === personalUserProfile?.id) {
        dispatch(setProfileInfo(values));
      }
      setUserProfile(values);
    },
    [setUserProfile, dispatch, personalUserProfile?.id]
  );

  // если данные профиля ещё не загрузились, то отправляем на форму undefined
  const defaultValues = userProfile?.id && userProfile;

  return (
    <FieldsContainer
      defaultValues={defaultValues}
      initialLoad={false}
      formName={formName}
      tab={tab}
      onFinish={handleFinish}
    />
  );
};

export default ProfileMain;
