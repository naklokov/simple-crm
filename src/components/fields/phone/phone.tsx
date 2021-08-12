import React, { useContext } from "react";
import { Form, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  getConformedValue,
  getNormalizePhone,
  useValidationService,
} from "../../../utils";
import { PhoneInput } from "../..";
import { SuffixIcon } from "./suffix-icon";

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
  const { form } = useContext(FormContext);
  const value = form?.getFieldValue(fieldCode);
  const { validationCallback, validationIcon } = useValidationService(
    _links?.validation?.href ?? "",
    fieldCode
  );

  const formatFunc = (input: string) => getConformedValue(input);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onBlur"
        normalize={getNormalizePhone}
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <div style={{ position: "relative" }}>
            <PhoneInput
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onBlur={validationCallback}
            />
            {validationIcon && <SuffixIcon icon={validationIcon} />}
          </div>
        )}
      </Form.Item>
    </Col>
  );
};

export default Phone;
