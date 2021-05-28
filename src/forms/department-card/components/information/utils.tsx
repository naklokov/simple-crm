import React, { ReactNode, useCallback, useMemo, useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../../../components";
import {
  FieldProps,
  FORM_NAMES,
  ProfileInfoEntityProps,
  urls,
} from "../../../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
} from "../../../../utils";

export const useChangeRoleDrawer = (
  title: string,
  fields: FieldProps[],
  onFinish: (values: ProfileInfoEntityProps) => void,
  successMessage: string,
  initialValues?: any
) => {
  const [visible, setVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  const handleFinish = useCallback(
    async (values: any) => {
      setSubmitLoading(true);
      const userProfileFieldCode = fields?.[0]?.fieldCode;
      const { [userProfileFieldCode]: userProfileId, ...data } = values;
      if (userProfileId)
        try {
          const url = getFullUrl(urls.userProfiles.entity, userProfileId);
          const response = await axios.put(url, { ...data, ...initialValues });
          defaultSuccessHandler(successMessage);
          onFinish?.(response?.data ?? {});
        } catch (error) {
          defaultErrorHandler({ error });
        } finally {
          setSubmitLoading(false);
          setVisible(false);
        }
    },
    [fields, onFinish, successMessage, initialValues]
  );

  const handleCloseDrawer = useCallback(() => {
    setVisible(false);
  }, []);

  const drawer = useMemo(
    () => (
      <DrawerForm
        title={title}
        fields={fields}
        name={FORM_NAMES.DEPARTMENT_CHIEF_CHANGE}
        onClose={handleCloseDrawer}
        visible={visible}
        submitLoading={submitLoading}
        onFinish={handleFinish}
      />
    ),
    [fields, title, handleCloseDrawer, handleFinish, submitLoading, visible]
  );

  return [drawer, showDrawer] as [ReactNode, () => void];
};
