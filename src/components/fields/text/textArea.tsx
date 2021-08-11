import React, { FocusEvent, useCallback, useContext } from "react";
import { Form, Input, Col } from "antd";
import { Rule } from "antd/lib/form";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  useFormValues,
  useValidationService,
} from "../../../utils";

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
  _links,
}: FieldProps) => {
  const { form, name } = useContext(FormContext);
  const [formValues] = useFormValues(name ?? "");
  const { wrappedRules } = useValidationService(
    rules,
    _links?.validation?.href ?? "",
    formValues
  );

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
        rules={wrappedRules}
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
