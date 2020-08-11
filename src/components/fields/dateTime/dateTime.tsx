import React from "react";
import moment from "moment";
import { Col, Form, DatePicker } from "antd";
import { FormFieldProps, DATE_FORMATS, DEFAULT_SPAN } from "../../../constants";

import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

const handleValueProp = (value: any) => {
  if (typeof value === "string") {
    return { value: moment(value) };
  }

  return { value };
};

export const DateTime = ({
  id,
  format = DATE_FORMATS.DATE,
  rules,
  title,
  description,
  placeholder = "Введите дату",
  disabled = false,
  readonly = false,
  span = DEFAULT_SPAN,
}: FormFieldProps) => (
  <Col span={span} key={id}>
    <Form.Item
      name={id}
      label={title}
      extra={description}
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
