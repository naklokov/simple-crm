import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import isEmpty from "lodash/isEmpty";
import { Col, Form, Select } from "antd";
import { FormFieldProps, OptionProps } from "../../../constants";
import { COOKIES } from "../../../constants/http";
import { logger } from "../../../utils";

const { Option } = Select;

const fetchDictionary = async (ref: string) => {
  const username = Cookie.get(COOKIES.USERNAME);
  try {
    const responce = await axios.get(ref);
    return responce?.data ?? {};
  } catch (error) {
    logger.error({ message: error.message, username });
  }
};

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
  span = 24,
}: FormFieldProps) => {
  debugger;
  const [options, setOptions] = useState<OptionProps[]>([]);

  useEffect(() => {
    debugger;
    const dictionary: any = fetchDictionary(url);
    setOptions(dictionary?.dictionaryValueEntities || []);
  }, [url]);

  if (isEmpty(options)) {
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
          {options.map(({ id, value }) => (
            <Option value={id}>{value}</Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  );
};

export default Dictionary;
