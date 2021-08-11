import React, { useContext } from "react";
import { Form, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  getConformedValue,
  getNormalizePhone,
  useFormValues,
  useValidationService,
} from "../../../utils";
import { SuffixIcon } from "./suffix-icon";
import { PhoneInput } from "../..";

export const Phone = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
  _links,
}: FieldProps) => {
  const { form, name } = useContext(FormContext);
  const value = form?.getFieldValue(fieldCode);
  const [formValues] = useFormValues(name ?? "");
  const {
    wrappedRules,
    validationIcon,
    validationStyle,
  } = useValidationService(rules, _links?.validation?.href ?? "", formValues);

  const formatFunc = (input: string) => getConformedValue(input);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={wrappedRules}
        validateTrigger="onBlur"
        normalize={getNormalizePhone}
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <div style={{ position: "relative" }}>
            <PhoneInput
              style={validationStyle}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
            />
            {validationIcon && <SuffixIcon icon={validationIcon} />}
          </div>
        )}
      </Form.Item>
    </Col>
  );
};

export default Phone;
