import React, { useCallback, useContext, useState } from "react";
import { Form, Col } from "antd";
import MaskedInput from "react-text-mask";
import {
  BASE_PHONE_MASK,
  DEFAULT_FIELD_SPAN,
  FieldProps,
  FULL_PHONE_MASK,
} from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  getClearPhone,
  getConformedValue,
  getMask,
  getNormalizePhone,
} from "../../../utils";

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
  const form = useContext(FormContext);
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

  const formatFunc = (value: string) => getConformedValue(value);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
        normalize={getNormalizePhone}
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <MaskedInput
            className="ant-input"
            guide={false}
            placeholder={placeholder}
            disabled={disabled}
            mask={mask}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Phone;
