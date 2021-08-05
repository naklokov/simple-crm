import React, { useContext } from "react";
import { Form, Col } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  getConformedValue,
  getNormalizePhone,
} from "../../../utils";
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
}: FieldProps) => {
  const { form } = useContext(FormContext);
  const value = form?.getFieldValue(fieldCode);

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
          <PhoneInput
            value={value}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Phone;
