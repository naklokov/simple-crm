import React from "react";
import { Form, Input } from "antd";
import { FormFieldProps } from "../../../constants";

export const TextArea = ({
  id,
  format,
  rules,
  title,
  description,
  placeholder,
  disabled = false,
  readonly = false,
  rows = 4,
}: FormFieldProps) => {
  return (
    <Form.Item name={id} label={title} extra={description} rules={rules}>
      <Input.TextArea
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        rows={rows}
      />
    </Form.Item>
  );
};

export default TextArea;
