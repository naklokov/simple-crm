import React, { useCallback, useState } from "react";
import { Form, Col } from "antd";
import MaskedInput from "react-text-mask";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";

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

const getClearPhone = (value: string) => value.replace(/[^0-9]/g, "");

export const Phone = ({
  fieldCode,
  format,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_SPAN,
}: FieldProps) => {
  const [mask, setMask] = useState(BASE_PHONE_MASK);

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    const clearValue = getClearPhone(value);
    const withoutCode = clearValue.length < 10;
    setMask(withoutCode ? BASE_PHONE_MASK : FULL_PHONE_MASK);
  }, []);

  const handleBlur = useCallback((event) => {
    const { value } = event.target;
    const clearValue = getClearPhone(value);
    setMask(clearValue.length <= 11 ? BASE_PHONE_MASK : FULL_PHONE_MASK);
  }, []);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
      >
        <MaskedInput
          className="ant-input"
          guide={false}
          mask={mask}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
    </Col>
  );
};

export default Phone;
