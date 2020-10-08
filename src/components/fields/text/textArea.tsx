import React from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { FormInstance } from "antd/lib/form";
import { Readonly } from "../readonly";

interface TextAreaFormField extends FieldProps {
  form: FormInstance;
  style?: object;
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
  style = {},
}: TextAreaFormField) => {
  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
        style={{ width: "100%", ...style }}
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
};

export default TextArea;
