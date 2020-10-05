import React, { useState, useCallback } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import {
  DEFAULT_SPAN,
  FieldProps,
  RSQL_OPERATORS_MAP,
} from "../../../constants";
import { defaultErrorHandler, getRsqlParams } from "../../../utils";
import { connect } from "react-redux";
import { ProfileInfoProps, State } from "../../../__data__/interfaces";

const { Option } = Select;

export const getSearchRsqlParams = (titleField: string, searched: string) => ({
  key: "entityData",
  operator: RSQL_OPERATORS_MAP.LIKE,
  value: `(${titleField},"${searched}")`,
});

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
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntity = async (searched: string, userProfileId: string) => {
    try {
      setLoading(true);
      const url = _links?.self.href ?? "";
      const query = getRsqlParams([
        { key: "userProfileId", value: userProfileId },
        getSearchRsqlParams(titleField, searched),
      ]);
      const response = await axios.get(url, { params: { query } });
      setOptions(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((value) => {
    if (value.length > 1 && profileInfo.id) {
      fetchEntity(value, profileInfo.id);
    } else {
      setOptions([]);
    }
  }, []);

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
          defaultActiveFirstOption={false}
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
      </Form.Item>
    </Col>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Entity);
