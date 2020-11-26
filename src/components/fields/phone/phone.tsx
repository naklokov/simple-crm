import React, { useCallback, useContext, useState } from "react";
import { Form, Col } from "antd";
import MaskedInput, { conformToMask } from "react-text-mask";
import {
  BASE_PHONE_LENGTH,
  DEFAULT_FIELD_SPAN,
  FieldProps,
  PHONE_MASK,
  PHONE_MASK_WITH_CODE,
} from "../../../constants";
import { Readonly } from "../readonly";
import {
  FormContext,
  getClearPhone,
  getConformedValue,
  getMask,
  getNormalizePhone,
  isNeedReplaceFirstChar,
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

    // до ввода 11 символа показываем маску без запятой для доп кода
    const withoutAdditionalCode = clearValue.length < BASE_PHONE_LENGTH - 1;
    setMask(withoutAdditionalCode ? PHONE_MASK : PHONE_MASK_WITH_CODE);
  }, []);

  const handleBlur = useCallback((event) => {
    const { value } = event.target;
    const mask = getMask(value);
    setMask(mask);
  }, []);

  const handlePipe = useCallback(
    (conformedValue: string, config: any) => {
      const clearPhone = config.rawValue;

      // удаляем 8 при копипасте номера
      if (isNeedReplaceFirstChar(clearPhone)) {
        const phoneWithoutFirstChar = config.rawValue.substring(1);
        return conformToMask(phoneWithoutFirstChar, mask, config)
          .conformedValue;
      }

      return conformedValue;
    },
    [mask]
  );

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
            pipe={handlePipe}
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
