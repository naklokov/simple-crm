import React from "react";
import { Col, Form, DatePicker } from "antd";
import { FormFieldProps } from "../../../constants";

export const DateTime = ({
  id,
  format = "DD:MM:YYYY",
  rules,
  title,
  description,
  placeholder,
  disabled = false,
  readonly = false,
  span = 8,
}: FormFieldProps) => (
  <Col span={span} key={id}>
    <Form.Item
      style={{ width: "100%" }}
      name={id}
      label={title}
      extra={description}
      rules={rules}
    >
      {/* <DatePicker
        // format={format}
        // placeholder={placeholder}
        // disabled={disabled}
        // inputReadOnly={readonly}
      /> */}
    </Form.Item>
  </Col>
);

export default DateTime;
