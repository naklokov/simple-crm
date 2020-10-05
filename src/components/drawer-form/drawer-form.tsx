import React, { useCallback, useState } from "react";
import { Drawer as DrawerUI, Form, PageHeader } from "antd";
import { FormFooter } from "../form-footer";
import { ComponentPermissionsChecker } from "../../wrappers";
import { createFormField, isValuesChanged, useFormValues } from "../../utils";
import isEmpty from "lodash/isEmpty";
import { FieldProps } from "../../constants";
import { Store } from "antd/lib/form/interface";

interface DrawerFormProps {
  name: string;
  fields: FieldProps[];
  submitLoading: boolean;
  title: string | React.ReactNode;
  visible: boolean;
  defaultSubmitDisabled?: boolean;
  onFinish: (values: Store) => void;
  onClose: (event?: any) => void;
  headerButtons?: React.ReactNode[];
}

export const DrawerForm = ({
  fields,
  name,
  onFinish,
  submitLoading,
  title,
  onClose,
  visible,
  headerButtons,
  defaultSubmitDisabled = true,
}: DrawerFormProps) => {
  const [form] = Form.useForm();
  const [submitDisabled, setSubmitDisabled] = useState(defaultSubmitDisabled);
  const { values: initialValues, clear } = useFormValues(name);

  const handleValuesChange = useCallback(
    (changed: Object, allValues: Object) => {
      const isChanged = isValuesChanged(initialValues, allValues);
      setSubmitDisabled(!isChanged);
    },
    [setSubmitDisabled, initialValues]
  );

  const handleClose = useCallback(
    (event) => {
      clear();
      onClose(event);
    },
    [onClose]
  );

  const handleFinish = useCallback(
    (values: Store) => {
      const data = { ...initialValues, ...values };
      clear();
      onFinish(data);
    },
    [initialValues, onClose, onFinish]
  );

  const handleVisibleChange = useCallback(
    (isVisible) => {
      if (!isVisible) {
        form.resetFields();
      }

      setSubmitDisabled(defaultSubmitDisabled);
    },
    [visible]
  );

  if (isEmpty(fields)) {
    return null;
  }

  return (
    <DrawerUI
      forceRender={true}
      title={
        <PageHeader
          style={{ padding: 0 }}
          title={title}
          extra={headerButtons}
        />
      }
      destroyOnClose={true}
      closeIcon={false}
      onClose={handleClose}
      afterVisibleChange={handleVisibleChange}
      visible={visible}
      footer={
        <FormFooter
          form={form}
          loading={submitLoading}
          onCancel={onClose}
          disabled={submitDisabled}
        />
      }
    >
      <Form
        name={name}
        form={form}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        {fields?.map((field) => (
          <ComponentPermissionsChecker
            key={field.fieldCode}
            availablePermissions={field.permissions}
            mode="disabled"
          >
            {createFormField(field)}
          </ComponentPermissionsChecker>
        ))}
      </Form>
    </DrawerUI>
  );
};

export default DrawerForm;
