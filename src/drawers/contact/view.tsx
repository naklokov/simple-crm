import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps, FORM_NAMES, PERMISSIONS_SET } from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  useFormValues,
} from "../../utils";
import { isEmpty } from "lodash";

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
  const { values } = useFormValues(FORM_NAMES.CONTACT_VIEW);

  const onFinish = async (data: Store) => {
    try {
      setSubmitLoading(true);
      const url = `${urls.contacts.entity}/${values.id}`;
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isEmpty(values)) {
    return null;
  }

  return (
    <DrawerForm
      title={title}
      fields={fields}
      initialValues={values}
      name={FORM_NAMES.CONTACT_VIEW}
      onClose={onClose}
      visible={visible}
      submitLoading={submitLoading}
      onFinish={onFinish}
    />
  );
};

export default ViewContact;
