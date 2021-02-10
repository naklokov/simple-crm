import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import {
  defaultErrorHandler,
  FormContext,
  getRsqlParams,
  getEqualRsql,
  getLikeRsql,
} from "../../../utils";
import { Readonly } from "../readonly";

const { Option } = Select;

// TODO сделать readonly
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
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialValue = form.getFieldValue(fieldCode);
    const initialQuery = getRsqlParams([getEqualRsql(codeField, initialValue)]);
    fetchEntity(initialQuery);
  }, []);

  const fetchEntity = async (query: string) => {
    try {
      setLoading(true);
      const url = _links?.self.href ?? "";
      const response = await axios.get(url, {
        params: { query },
      });
      setOptions(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (value) => {
      const searchedQuery = getRsqlParams([getLikeRsql([titleField], value)]);
      fetchEntity(searchedQuery);
    },
    [titleField]
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
            {options.map((o: any) => (
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
