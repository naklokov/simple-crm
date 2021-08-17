import React from "react";
import { Col, Form, Select } from "antd";
import {
  DictionaryProps,
  FieldProps,
  DEFAULT_FIELD_SPAN,
} from "../../../constants";
import { useFetch, useValidationService } from "../../../utils";
import { Readonly } from "../readonly";
import { Loading } from "../loading";

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
  const {
    validationCallback,
    validationIcon,
    validationStyle,
  } = useValidationService(_links?.validation?.href ?? "", fieldCode);
  const url = _links?.self.href ?? "";
  const [dictionary, loading] = useFetch<DictionaryProps>({
    url,
    initial: {},
  });
  const { dictionaryValueEntities: options = [] } = dictionary;

  const formatFunc = (value: string) =>
    options.find((o) => o.valueCode === value)?.value ?? "";

  const style = { width: "100%" };

  if (loading) {
    return (
      <Loading
        style={style}
        label={fieldName}
        extra={fieldDescription}
        name={fieldCode}
        span={span}
      />
    );
  }

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        style={style}
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
            style={{ width: "100%", ...validationStyle }}
            disabled={disabled}
            suffixIcon={validationIcon}
            onBlur={validationCallback}
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
