import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps } from "../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";
import { useParams } from "react-router";

interface AddTaskProps {
  fields: FieldProps[];
  visible: boolean;
  onClose: (event: any, entity?: Store) => void;
}

export const AddTask = ({ fields, visible, onClose }: AddTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Store) => {
    setLoading(true);
    try {
      const responce = await axios.post(urls.contacts.entity, {
        ...values,
        clientId,
      });
      defaultSuccessHandler(t("message.success.add"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      title={t("title.new")}
      fields={fields}
      name="taskAdd"
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
    />
  );
};

export default AddTask;
