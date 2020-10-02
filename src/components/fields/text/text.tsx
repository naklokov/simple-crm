import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { vatValidator } from "./utils";

export const Text = ({
  fieldCode,
  format,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_SPAN,
}: FieldProps) => (
  <Col {...span} key={fieldCode}>
    <Form.Item
      style={{ width: "100%" }}
      name={fieldCode}
      label={fieldName}
      extra={fieldDescription}
      validateTrigger="onSubmit"
      rules={rules}
    >
      <Input
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
    </Form.Item>
  </Col>
);

export default Text;
