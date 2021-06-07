import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import { useDispatch } from "react-redux";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import {
  defaultErrorHandler,
  FormContext,
  getRsqlParams,
  getEqualRsql,
  getSearchRsql,
  mergeInitialParams,
} from "../../../utils";
import { Readonly } from "../readonly";
import { setFormLoading } from "../../../__data__";

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
  const { name = "", form } = useContext(FormContext) ?? {};
  const dispatch = useDispatch();
  const [options, setOptions] = useState<{ label: string; value: string }[]>();
  const [loading, setLoading] = useState(false);
  const [url, initialSearch] = _links?.self?.href?.split("?") ?? [];

  const fetchEntity = useCallback(
    async (rsqlQuery: string, initial = false) => {
      const params = mergeInitialParams(rsqlQuery, initialSearch);
      try {
        if (initial) {
          dispatch(setFormLoading({ name, loading: true }));
        }
        setLoading(true);
        const response = await axios.get(url, {
          params,
        });
        const mappingOptions =
          response?.data?.map((o: any) => {
            const { [titleField]: label, [codeField]: value } = o;
            return { label, value };
          }) ?? [];

        setOptions(mappingOptions);
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        if (initial) {
          dispatch(setFormLoading({ name, loading: false }));
        }
        setLoading(false);
      }
    },
    [url, dispatch, name, codeField, titleField, initialSearch]
  );

  useEffect(() => {
    const initialValue = form?.getFieldValue(fieldCode);
    const query = initialValue
      ? getRsqlParams([getEqualRsql(codeField, initialValue)])
      : "";

    fetchEntity(query, true);
  }, []);

  const handleSearch = useCallback(
    (value) => {
      const query = getRsqlParams([getSearchRsql([titleField], value)]);
      fetchEntity(query);
    },
    [fetchEntity, titleField]
  );
  const formatFunc = (value: string) =>
    options?.find((o) => o.value === value)?.label ?? "";

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        style={{ width: "100%" }}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onBlur"
      >
        {readonly ? (
          <Readonly format={formatFunc} loading={loading} />
        ) : (
          <Select
            showSearch
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            placeholder={placeholder}
            style={{ width: "100%" }}
            loading={loading}
            disabled={disabled}
            notFoundContent={loading ? <Spin size="small" /> : null}
            options={options}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Entity;
