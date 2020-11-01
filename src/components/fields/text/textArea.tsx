import React, { useContext } from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { FormContext } from "../../../utils";

export const TextArea = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  rows = 4,
  span = {},
}: FieldProps) => {
  const form = useContext(FormContext);
  const value = form.getFieldValue(fieldCode);
  const isReadonlyEmpty = readonly && !value;
  const colSpan = isReadonlyEmpty ? DEFAULT_SPAN : { ...DEFAULT_SPAN, ...span };
  return (
    <Col {...colSpan} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
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
};

export default TextArea;
