import React from "react";
import moment from "moment-timezone";
import { Col, Form, DatePicker } from "antd";
import { DATE_FORMATS, DEFAULT_SPAN, FieldProps } from "../../../constants";
import { getDateWithTimezone } from "../../../utils";
import { FormInstance } from "antd/lib/form";

const getDisabledDate = (currentDate: moment.Moment) =>
  getDateWithTimezone(currentDate.toISOString()).isBefore(
    moment().startOf("day")
  );

const handleValueProp = (value: any) => {
  if (typeof value === "string") {
    const date = getDateWithTimezone(value);
    return { value: date };
  }

  return { value };
};

interface DateTimeFormField extends FieldProps {
  form: FormInstance;
  style?: object;
}

export const DateTime = ({
  fieldCode,
  format = DATE_FORMATS.DATE,
  rules,
  fieldName,
  fieldDescription,
  placeholder = "Введите дату",
  disabled = false,
  readonly = false,
  withSelectBefore = false,
  span = DEFAULT_SPAN,
  style = {},
}: DateTimeFormField) => {
  const showTime = /hh:mm/gi.test(format);
  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={style}
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
          disabledDate={!withSelectBefore ? getDisabledDate : void 0}
        />
      </Form.Item>
    </Col>
  );
};

export default DateTime;
