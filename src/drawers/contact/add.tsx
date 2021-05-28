import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { useParams } from "react-router-dom";
import { DrawerForm } from "../../components";
import { urls, FieldProps, QueryProps, FORM_NAMES } from "../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";

interface AddContactProps {
  fields: FieldProps[];
  visible: boolean;
  onClose: (entity?: Store) => void;
}

export const AddContact = ({ fields, visible, onClose }: AddContactProps) => {
  const [t] = useTranslation("contactDrawer");
  const { id: clientId } = useParams<QueryProps>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const response = await axios.post(urls.contacts.entity, {
        ...values,
        clientId,
      });
      defaultSuccessHandler(t("message.success.add"));
      onClose(response?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <DrawerForm
      title={t("title.new")}
      fields={fields}
      name={FORM_NAMES.CONTACT_ADD}
      onClose={onClose}
      visible={visible}
      submitLoading={submitLoading}
      onFinish={onFinish}
    />
  );
};

export default AddContact;
