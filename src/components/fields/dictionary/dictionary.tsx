import React, { useContext, useEffect } from "react";
import { Col, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  DictionaryProps,
  FieldProps,
  DEFAULT_FIELD_SPAN,
} from "../../../constants";
import { FormContext, useFetch } from "../../../utils";
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
  const url = _links?.self.href ?? "";
  const { name = "" } = useContext(FormContext);
  const [dictionary, loading] = useFetch<DictionaryProps>({
    url,
    initial: {},
  });
  const { dictionaryValueEntities: options = [] } = dictionary;

  useEffect(() => {
    dispatch(setFormLoading({ name, loading }));
  }, [loading, dispatch, name]);

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
          <Readonly format={formatFunc} loading={loading} />
        ) : (
          <Select
            placeholder={placeholder}
            style={{ width: "100%" }}
            disabled={disabled}
            loading={loading}
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
