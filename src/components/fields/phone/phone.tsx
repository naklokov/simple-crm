import React from "react";
import { Form, Col } from "antd";
import MaskedInput from "react-text-mask";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";

const PHONE_MASK = [
  "+",
  "7",
  " ",
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const Phone = ({
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
      rules={rules}
    >
      <MaskedInput
        className="ant-input"
        mask={PHONE_MASK}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
    </Form.Item>
  </Col>
);

export default Phone;
