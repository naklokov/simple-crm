import React, { useEffect, useCallback, useState } from "react";
import { Drawer as DrawerUI, Form, PageHeader, Typography } from "antd";
import { FormFooter } from "../form-footer";
import { ComponentPermissionsChecker } from "../../wrappers";
import { createFormField, isValuesChanged } from "../../utils";
import isEmpty from "lodash/isEmpty";
import { FieldProps } from "../../constants";
import { Store } from "antd/lib/form/interface";

interface DrawerFormProps {
  name: string;
  fields: FieldProps[];
  initialValues?: object;
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
  initialValues = {},
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

  const handleValuesChange = useCallback(
    (changed: Object, allValues: Object) => {
      const isChanged = isValuesChanged(initialValues, allValues);
      setSubmitDisabled(!isChanged);
    },
    [setSubmitDisabled, initialValues]
  );

  const handleClose = useCallback((event) => {
    setSubmitDisabled(true);
    onClose(event);
  }, []);

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible]);

  if (isEmpty(fields)) {
    return null;
  }

  return (
    <DrawerUI
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
        onFinish={onFinish}
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
