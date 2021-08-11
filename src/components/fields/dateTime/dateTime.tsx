import React, { useContext } from "react";
import moment from "moment-timezone";
import { Col, Form, DatePicker } from "antd";
import {
  DATE_FORMATS,
  DEFAULT_FIELD_SPAN,
  FieldProps,
} from "../../../constants";
import {
  FormContext,
  getDateWithTimezone,
  useFormValues,
  useValidationService,
} from "../../../utils";
import { Readonly } from "../readonly";

const getDisabledDate = (currentDate: moment.Moment) =>
  currentDate
    ? getDateWithTimezone(currentDate.toISOString()).isBefore(
        moment().startOf("day")
      )
    : true;

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const getDisabledTime = (selectedDate: moment.Moment | null) => {
  const currentHours = moment().get("hours");
  const currentMinutes = moment().get("minutes");
  const isAfterCurrentHour = moment().endOf("hour").isAfter(selectedDate);
  const isAfterCurrentDay = moment().endOf("day").isAfter(selectedDate);

  return {
    disabledHours: () => (isAfterCurrentDay ? range(0, currentHours) : []),
    disabledMinutes: () => (isAfterCurrentHour ? range(0, currentMinutes) : []),
  };
};

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
  withSelectBefore = false,
  span = DEFAULT_FIELD_SPAN,
  _links,
}: FieldProps) => {
  const { name } = useContext(FormContext);
  const [formValues] = useFormValues(name ?? "");
  const { wrappedRules } = useValidationService(
    rules,
    _links?.validation?.href ?? "",
    formValues
  );

  const showTime = /hh:mm/gi.test(format)
    ? { hideDisabledOptions: true }
    : false;

  const formatFunc = (value: string) =>
    value ? getDateWithTimezone(value).format(format) : "";

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        rules={wrappedRules}
        getValueProps={handleValueProp}
        validateTrigger="onBlur"
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <DatePicker
            autoComplete="off"
            style={{ width: "100%" }}
            format={format}
            placeholder={placeholder}
            disabled={disabled}
            showTime={showTime}
            inputReadOnly={readonly}
            disabledDate={!withSelectBefore ? getDisabledDate : undefined}
            disabledTime={!withSelectBefore ? getDisabledTime : undefined}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default DateTime;
