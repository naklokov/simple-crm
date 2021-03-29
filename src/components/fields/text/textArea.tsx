import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";

export const TextArea = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  rows = 4,
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => (
  <Col {...span} key={fieldCode}>
    <Form.Item
      name={fieldCode}
      label={fieldName}
      extra={fieldDescription}
      rules={rules}
      validateTrigger="onBlur"
      style={{ width: "100%" }}
    >
      {readonly ? (
        <Readonly />
      ) : (
        <Input.TextArea
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled}
          autoSize={{ minRows: 1, maxRows: 6 }}
          rows={rows}
        />
      )}
    </Form.Item>
  </Col>
);

export default TextArea;
