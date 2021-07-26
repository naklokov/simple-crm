import React, { useCallback, useContext, FocusEvent } from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { FormContext } from "../../../utils";

export const Text = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => {
  const { form } = useContext(FormContext);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      form?.setFieldsValue({ [fieldCode]: event?.target?.value?.trim() ?? "" });
    },
    [fieldCode, form]
  );

  return (
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
            onBlur={handleBlur}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Text;
