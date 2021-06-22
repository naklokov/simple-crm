import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { isEmpty } from "lodash";
import { DrawerForm } from "../../components";
import {
  urls,
  TASK_STATUSES,
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

export const CompleteTask = ({
  title,
  fields,
  visible,
  onClose,
}: DrawerFormProps) => {
  const [t] = useTranslation("tasksDrawer");
  const [loading, setLoading] = useState(false);
  const metaCompletedInfo = {
    taskStatus: TASK_STATUSES.COMPLETED,
  };
  const [task] = useFormValues<TaskEntityProps>(FORM_NAMES.TASK_COMPLETED);

  const onFinish = async (data: Store) => {
    setLoading(true);
    try {
      const url = getFullUrl(urls.tasks.entity, task.id);
      const response = await axios.put(url, { ...data, ...metaCompletedInfo });
      defaultSuccessHandler(t("message.success.completed"));

      onClose<TaskEntityProps>(response?.data ?? {});
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty(task)) {
    return null;
  }

  return (
    <DrawerForm
      title={title}
      fields={fields}
      name={FORM_NAMES.TASK_COMPLETED}
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
      defaultSubmitDisabled={false}
    />
  );
};

export default CompleteTask;
