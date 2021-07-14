import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { Col, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  DictionaryProps,
  FieldProps,
  DEFAULT_FIELD_SPAN,
} from "../../../constants";
import { useFetch } from "../../../utils";
import { setFormLoading } from "../../../__data__";
import { Readonly } from "../readonly";

const { Option } = Select;

export const Dictionary: React.FC<FieldProps> = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  readonly = false,
  _links,
  span = DEFAULT_FIELD_SPAN,
}) => {
  const dispatch = useDispatch();
  const [dictionary, setDictionary] = useState<DictionaryProps>({});
  const url = _links?.self.href ?? "";
  const { dictionaryValueEntities: options } = dictionary;
  const { loading, response } = useFetch({ url });

  useEffect(() => {
    dispatch(setFormLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    setDictionary(response?.data ?? []);
  }, [response]);

  if (!options || isEmpty(options)) {
    return null;
  }

  const formatFunc = (value: string) =>
    options.find((o) => o.valueCode === value)?.value ?? "";

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        style={{ width: "100%" }}
        label={fieldName}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onBlur"
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

export default Dictionary;
