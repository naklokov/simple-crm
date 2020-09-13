import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps, TASK_STATUSES, TASK_TYPES } from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
} from "../../utils";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";

interface CompleteTaskProps {
  fields: FieldProps[];
  visible: boolean;
  initialValues: Store;
  onClose: (event: any, entity?: Store) => void;
}

export const CompleteTask = ({
  fields,
  visible,
  onClose,
  initialValues: { id, ...initialValues },
}: CompleteTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(false);
  const metaCompletedInfo = {
    taskStatus: TASK_STATUSES.COMPLETED,
  };

  const onFinish = async (values: Store) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        ...initialValues,
        ...metaCompletedInfo,
      };
      const url = getFullUrl(urls.tasks.entity, id);
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.completed"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      initialValues={initialValues}
      title={t("title.completed")}
      fields={fields}
      name="taskCompleted"
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
    />
  );
};

export default CompleteTask;
