import "moment/locale/ru";

import React from "react";
import { Col, Form, DatePicker } from "antd";
import { DATE_FORMATS, DEFAULT_SPAN, FieldProps } from "../../../constants";
import { getDateWithTimezone } from "../../../utils";

const handleValueProp = (value: any) => {
  if (typeof value === "string") {
    const date = getDateWithTimezone(value);
    return { value: date };
  }

  return { value };
};

export const DateTime = ({
  fieldCode,
  format = DATE_FORMATS.DATE,
  rules,
  fieldName,
  fieldDescription,
  placeholder = "Введите дату",
  disabled = false,
  readonly = false,
  span = DEFAULT_SPAN,
}: FieldProps) => {
  const showTime = /hh:mm/gi.test(format);
  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        getValueProps={handleValueProp}
      >
        <DatePicker
          autoComplete="off"
          style={{ width: "100%" }}
          format={format}
          placeholder={placeholder}
          disabled={disabled}
          showTime={showTime}
          inputReadOnly={readonly}
        />
      </Form.Item>
    </Col>
  );
};

export default DateTime;
