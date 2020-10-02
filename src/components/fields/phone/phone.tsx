import React from "react";
import { Form, Col, Input } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import InputMask from "react-input-mask";

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
      <InputMask
        mask="+7 (999) 999-99-99, 99999"
        alwaysShowMask={false}
        maskChar="_"
        className="ant-input"
      />
    </Form.Item>
  </Col>
);

export default Phone;
