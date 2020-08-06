import React from "react";
import { Form, Input } from "antd";
import { FormFieldProps } from "../../../constants";

export const Text = ({
  id,
  format,
  rules,
  title,
  description,
  placeholder,
  disabled = false,
  readonly = false,
}: FormFieldProps) => {
  return (
    <Form.Item name={id} label={title} extra={description} rules={rules}>
      <Input
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
    </Form.Item>
  );
};

export default Text;
