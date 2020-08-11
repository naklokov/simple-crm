import React, { useState, useEffect } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { Col, Form, Select } from "antd";
import { Dispatch } from "@reduxjs/toolkit";
import {
  FormFieldProps,
  DictionaryProps,
  DEFAULT_SPAN,
} from "../../../constants";
import { logger } from "../../../utils";
import { setLoading } from "../../../__data__";
import { connect } from "react-redux";

const { Option } = Select;

interface DictionaryComponentProps extends FormFieldProps {
  setLoading: (loading: boolean) => void;
}

export const Dictionary = ({
  id,
  format,
  rules,
  title,
  description,
  placeholder = "Выберите значение",
  disabled = false,
  readonly = false,
  url = "",
  span = DEFAULT_SPAN,
  setLoading,
}: DictionaryComponentProps) => {
  const [dictionary, setDictionary] = useState<DictionaryProps>({});
  const { dictionaryValueEntities: options } = dictionary;

  const fetchDictionary = async () => {
    try {
      setLoading(true);
      const responce = await axios.get(url);
      setDictionary(responce?.data ?? {});
    } catch (error) {
      const data = error?.response?.data ?? {};
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDictionary();
  }, [url]);

  if (!options || isEmpty(options)) {
    return null;
  }

  return (
    <Col span={span} key={id}>
      <Form.Item name={id} label={title} extra={description} rules={rules}>
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
      </Form.Item>
    </Col>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(null, mapDispatchToProps)(Dictionary);
