import React from "react";
import moment from "moment";
import { Col, Form, DatePicker } from "antd";
import { DATE_FORMATS, DEFAULT_SPAN, FieldProps } from "../../../constants";

import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

const handleValueProp = (value: any) => {
  if (typeof value === "string") {
    return { value: moment(value) };
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
}: FieldProps) => (
  <Col span={span} key={fieldCode}>
    <Form.Item
      name={fieldCode}
      label={fieldName}
      extra={fieldDescription}
      rules={rules}
      getValueProps={handleValueProp}
    >
      <DatePicker
        style={{ width: "100%" }}
        format={format}
        locale={locale}
        placeholder={placeholder}
        disabled={disabled}
        inputReadOnly={readonly}
      />
    </Form.Item>
  </Col>
);

export default DateTime;
