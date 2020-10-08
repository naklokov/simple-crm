import React, { useCallback, useEffect, useState } from "react";
import { Form, Col } from "antd";
import MaskedInput, { conformToMask } from "react-text-mask";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { FormInstance } from "antd/lib/form";
import { Readonly } from "../readonly";

const BASE_PHONE_MASK = [
  "+",
  "7",
  " ",
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const FULL_PHONE_MASK = [...BASE_PHONE_MASK, ",", " ", /\d/, /\d/, /\d/];

const getClearPhone = (value: string) => value?.replace(/[^0-9]/g, "") ?? "";

const getMask = (value: string) => {
  const clearValue = getClearPhone(value);
  const withoutCode = clearValue.length <= 11;
  return withoutCode ? BASE_PHONE_MASK : FULL_PHONE_MASK;
};

interface PhoneFormField extends FieldProps {
  form: FormInstance;
  style?: object;
}

export const Phone = ({
  fieldCode,
  format,
  form,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_SPAN,
  style = {},
}: PhoneFormField) => {
  const [mask, setMask] = useState(getMask(form.getFieldValue(fieldCode)));

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    const clearValue = getClearPhone(value);
    const isBasePhone = clearValue.length < 10;
    setMask(isBasePhone ? BASE_PHONE_MASK : FULL_PHONE_MASK);
  }, []);

  const handleBlur = useCallback((event) => {
    const { value } = event.target;
    const mask = getMask(value);
    setMask(mask);
  }, []);

  const formatFunc = (value: string) =>
    value ? conformToMask(value, mask, {}).conformedValue : "";

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%", ...style }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <MaskedInput
            className="ant-input"
            guide={false}
            mask={mask}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Phone;
