import React, { useState, useCallback, useEffect } from "react";
import { Drawer as DrawerUI, Row } from "antd";
import { FormFooter } from "../form-footer";
import Form, { useForm } from "antd/lib/form/Form";
import { ComponentPermissionsChecker } from "../../wrappers";
import { createFormField, isValuesChanged } from "../../utils";
import isEmpty from "lodash/isEmpty";
import { FieldProps } from "../../constants";
import { Store } from "antd/lib/form/interface";

type ModeType = "view" | "add";

interface DrawerFormProps {
  name: string;
  fields: FieldProps[];
  mode?: ModeType;
  initialValues?: object;
  onFinish: (values: Store) => void;
  submitLoading: boolean;
  title: string | React.ReactNode;
  visible: boolean;
  onClose: (entity?: Store) => void;
}

export const DrawerForm = ({
  fields,
  name,
  mode,
  initialValues = {},
  onFinish,
  submitLoading,
  title,
  onClose,
  visible,
}: DrawerFormProps) => {
  const [form] = useForm();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleValuesChange = useCallback(
    (changed: Object, allValues: Object) => {
      const isChanged = isValuesChanged(initialValues, allValues);
      setSubmitDisabled(!isChanged);
    },
    [setSubmitDisabled, initialValues]
  );

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
      title={title}
      destroyOnClose={true}
      onClose={onClose}
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
