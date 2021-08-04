import React, { useCallback, useContext, FocusEvent } from "react";
import { Form, Input, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { FormContext, useValidationService } from "../../../utils";

const Text: React.FC<FieldProps> = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
  _links,
}) => {
  const { form, name } = useContext(FormContext);
  const {
    wrappedRules,
    validationIcon,
    validationStyle,
  } = useValidationService(rules, name ?? "", _links?.validation?.href ?? "");

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      form.setFieldsValue({ [fieldCode]: event?.target?.value?.trim() ?? "" });
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
        rules={wrappedRules}
      >
        {readonly ? (
          <Readonly />
        ) : (
          <Input
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            onBlur={handleBlur}
            style={validationStyle}
            suffix={validationIcon}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Text;
