import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { Col, Form, Select } from "antd";
import { Dispatch } from "@reduxjs/toolkit";
import { DictionaryProps, DEFAULT_SPAN, FieldProps } from "../../../constants";
import { useFetch } from "../../../utils";
import { setLoading } from "../../../__data__";
import { connect } from "react-redux";
import { Readonly } from "../readonly";

const { Option } = Select;

interface DictionaryComponentProps extends FieldProps {
  setLoading: (loading: boolean) => void;
}

export const Dictionary = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  readonly = false,
  _links,
  span = DEFAULT_SPAN,
  setLoading,
}: DictionaryComponentProps) => {
  const [dictionary, setDictionary] = useState<DictionaryProps>({});
  const url = _links?.self.href ?? "";
  const { dictionaryValueEntities: options } = dictionary;
  const { loading, response } = useFetch({ url });

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setDictionary(response?.data ?? []);
  }, [response]);

  if (!options || isEmpty(options)) {
    return null;
  }

  const formatFunc = (value: string) =>
    options.find((o) => o.valueCode === value)?.value ?? "";

  const colSpan = { ...DEFAULT_SPAN, ...span };
  return (
    <Col {...colSpan} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        style={{ width: "100%" }}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <Select
            placeholder={placeholder}
            style={{ width: "100%" }}
            disabled={disabled}
          >
            {options.map(({ id, value, valueCode }) => (
              <Option key={id} value={valueCode}>
                {value}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Col>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(null, mapDispatchToProps)(Dictionary);
