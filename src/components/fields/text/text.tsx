import React from "react";
import { Form, Input, Col } from "antd";
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
  span = 24,
}: FormFieldProps) => (
  <Col span={span} key={id}>
    <Form.Item
      style={{ width: "100%" }}
      name={id}
      label={title}
      extra={description}
      rules={rules}
    >
      <Input
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
    </Form.Item>
  </Col>
);

export default Text;
