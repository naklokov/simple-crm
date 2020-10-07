import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import {
  urls,
  FieldProps,
  QueryProps,
  FORM_NAMES,
  PERMISSIONS_SET,
  PERMISSIONS,
} from "../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";
import { useParams } from "react-router";

interface AddContactProps {
  fields: FieldProps[];
  visible: boolean;
  onClose: (event: any, entity?: Store) => void;
}

export const AddContact = ({ fields, visible, onClose }: AddContactProps) => {
  const [t] = useTranslation("contactDrawer");
  const { id: clientId } = useParams<QueryProps>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const responce = await axios.post(urls.contacts.entity, {
        ...values,
        clientId,
      });
      defaultSuccessHandler(t("message.success.add"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <DrawerForm
      permissions={[PERMISSIONS.CONTACTS.ADD]}
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
