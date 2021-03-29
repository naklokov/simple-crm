import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";

export const Text = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => (
  <Col {...span} key={fieldCode}>
    <Form.Item
      style={{ width: "100%" }}
      name={fieldCode}
      label={fieldName}
      extra={fieldDescription}
      validateTrigger="onBlur"
      rules={rules}
    >
      {readonly ? (
        <Readonly />
      ) : (
        <Input
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </Form.Item>
  </Col>
);

export default Text;
