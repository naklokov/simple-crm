import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import { DEFAULT_SPAN, FieldProps, urls } from "../../../constants";
import { defaultErrorHandler, getRsqlParams, useFetch } from "../../../utils";
import { connect } from "react-redux";
import { ProfileInfoProps, State } from "../../../__data__/interfaces";

const { Option } = Select;

interface DictionaryComponentProps extends FieldProps {
  profileInfo: ProfileInfoProps;
}

export const Entity = ({
  fieldCode,
  format,
  rules,
  fieldName,
  titleField = "value",
  codeField = "valueCode",
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  readonly = false,
  _links,
  span = DEFAULT_SPAN,
  profileInfo,
}: DictionaryComponentProps) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntity = async (userProfileId: string) => {
    try {
      setLoading(true);
      const url = _links?.self.href ?? "";
      const query = getRsqlParams([
        { key: "userProfileId", value: userProfileId },
      ]);
      const response = await axios.get(url, { params: { query } });
      setOptions(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileInfo.id) {
      fetchEntity(profileInfo.id);
    }
  }, [profileInfo.id]);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        style={{ width: "100%" }}
        extra={fieldDescription}
        rules={rules}
      >
        <Select
          showSearch
          placeholder={placeholder}
          style={{ width: "100%" }}
          disabled={disabled}
          notFoundContent={loading ? <Spin size="small" /> : null}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((o) => (
            <Option key={o[codeField]} value={o[codeField]}>
              {o[titleField]}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Entity);
