import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { FormInstance } from "antd/lib/form";

interface TextFormField extends FieldProps {
  form: FormInstance;
  style?: object;
}

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
  style = {},
}: TextFormField) => (
  <Col {...span} key={fieldCode}>
    <Form.Item
      style={{ width: "100%", ...style }}
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
