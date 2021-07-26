import React, { FocusEvent, useCallback, useContext } from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
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
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => {
  const { form } = useContext(FormContext);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      form?.setFieldsValue({ [fieldCode]: event?.target?.value?.trim() ?? "" });
    },
    [fieldCode, form]
  );

  return (
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
            onBlur={handleBlur}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default TextArea;
