import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import {
  defaultErrorHandler,
  FormContext,
  getRsqlParams,
  getEqualRsql,
  getSearchRsql,
} from "../../../utils";
import { Readonly } from "../readonly";

const { Option } = Select;

export const Entity = ({
  fieldCode,
  rules,
  fieldName,
  titleField = "value",
  codeField = "valueCode",
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  _links,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => {
  const form = useContext(FormContext);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntity = async (params: object) => {
    try {
      setLoading(true);
      const url = _links?.self.href ?? "";
      const response = await axios.get(url, {
        params,
      });
      setOptions(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialValue = form.getFieldValue(fieldCode);
    const query = getRsqlParams([getEqualRsql(codeField, initialValue)]);
    const params = initialValue ? { query } : {};
    fetchEntity(params);
  }, []);

  const handleSearch = useCallback(
    (value) => {
      const query = getRsqlParams([getSearchRsql([titleField], value)]);
      fetchEntity({ query });
    },
    [fetchEntity, titleField]
  );
  const formatFunc = (value: string) =>
    options.find((o: any) => o[codeField] === value)?.[titleField] ?? "";

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        style={{ width: "100%" }}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <Select
            showSearch
            filterOption={false}
            onSearch={handleSearch}
            placeholder={placeholder}
            style={{ width: "100%" }}
            disabled={disabled}
            notFoundContent={loading ? <Spin size="small" /> : null}
            showArrow={false}
          >
            {options.map((o) => (
              <Option key={o[codeField]} value={o[codeField]}>
                {o[titleField]}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Col>
  );
};

export default Entity;
