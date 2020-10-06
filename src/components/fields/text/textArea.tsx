import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { FormInstance } from "antd/lib/form";

interface TextAreaFormField extends FieldProps {
  form: FormInstance;
}

export const TextArea = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  rows = 4,
  span = DEFAULT_SPAN,
}: TextAreaFormField) => {
  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        style={{ width: "100%" }}
      >
        <Input.TextArea
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          autoSize={{ minRows: 1, maxRows: 6 }}
          rows={rows}
        />
      </Form.Item>
    </Col>
  );
};

export default TextArea;
