import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps } from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
} from "../../utils";

interface ViewTaskProps {
  initialValues: Store;
  fields: FieldProps[];
  visible: boolean;
  title: string;
  onClose: (event: any, entity?: Store) => void;
}

export const ViewTask = ({
  initialValues: { id, ...initialValues },
  fields,
  visible,
  onClose,
  title,
}: ViewTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Store) => {
    try {
      setLoading(true);
      const data = { ...initialValues, ...values };
      const url = getFullUrl(urls.contacts.entity, id);
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      title={title}
      fields={fields}
      name="taskView"
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
    />
  );
};

export default ViewTask;
