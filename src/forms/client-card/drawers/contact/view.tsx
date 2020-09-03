import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps } from "../../../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../../../utils";

interface ViewContactProps {
  initialValues: Store;
  fields: FieldProps[];
  visible: boolean;
  onClose: (entity?: Store) => void;
}

export const ViewContact = ({
  initialValues: { id, ...initialValues },
  fields,
  visible,
  onClose,
}: ViewContactProps) => {
  const [t] = useTranslation("contactDrawer");
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const data = { ...initialValues, ...values };
      const url = `${urls.contacts.entity}/${id}`;
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));
      onClose(responce?.data);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <DrawerForm
      initialValues={initialValues}
      title={t("title.view")}
      fields={fields}
      name="contactView"
      onClose={onClose}
      visible={visible}
      submitLoading={submitLoading}
      onFinish={onFinish}
    />
  );
};

export default ViewContact;
