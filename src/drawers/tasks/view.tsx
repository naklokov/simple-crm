import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { isEmpty } from "lodash";
import { DrawerForm } from "../../components";
import {
  urls,
  FORM_NAMES,
  DrawerFormProps,
  TaskEntityProps,
} from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  useFormValues,
} from "../../utils";

export const ViewTask = ({
  fields,
  visible,
  onClose,
  title,
}: DrawerFormProps) => {
  const [t] = useTranslation("tasksDrawer");
  const { values } = useFormValues<TaskEntityProps>(FORM_NAMES.TASK_VIEW);
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: Store) => {
    try {
      setLoading(true);
      const url = getFullUrl(urls.tasks.entity, data.id);
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));

      onClose<TaskEntityProps>(responce?.data ?? {});
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty(values)) {
    return null;
  }

  return (
    <DrawerForm
      title={title}
      fields={fields}
      name={FORM_NAMES.TASK_VIEW}
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      initialValues={values}
      onFinish={onFinish}
    />
  );
};

export default ViewTask;
