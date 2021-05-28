import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { isEmpty } from "lodash";
import { DrawerForm } from "../../components";
import {
  urls,
  FieldProps,
  FORM_NAMES,
  ContactEntityProps,
} from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  useFormValues,
} from "../../utils";

interface ViewContactProps {
  fields: FieldProps[];
  visible: boolean;
  title: string;
  onClose: (event: any, entity?: Store) => void;
}

export const ViewContact = ({
  fields,
  visible,
  onClose,
  title,
}: ViewContactProps) => {
  const [t] = useTranslation("contactDrawer");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [contact] = useFormValues<ContactEntityProps>(FORM_NAMES.CONTACT_VIEW);

  const onFinish = async (data: Store) => {
    try {
      setSubmitLoading(true);
      const url = `${urls.contacts.entity}/${contact.id}`;
      const response = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));
      onClose(response?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isEmpty(contact)) {
    return null;
  }

  return (
    <DrawerForm
      title={title}
      fields={fields}
      initialValues={contact}
      name={FORM_NAMES.CONTACT_VIEW}
      onClose={onClose}
      visible={visible}
      submitLoading={submitLoading}
      onFinish={onFinish}
    />
  );
};

export default ViewContact;
