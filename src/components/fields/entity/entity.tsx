import React, { useState, useCallback } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import {
  DEFAULT_SPAN,
  FieldProps,
  ProfileInfoProps,
  State,
} from "../../../constants";
import { defaultErrorHandler, getRsqlParams } from "../../../utils";
import { connect } from "react-redux";
import { getSearchByColumnsRsql } from "../../../forms/clients/utils";

const { Option } = Select;

interface DictionaryComponentProps extends FieldProps {
  profileInfo: ProfileInfoProps;
}

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
        getSearchByColumnsRsql([titleField], searched),
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

  const colSpan = { ...DEFAULT_SPAN, ...span };
  return (
    <Col {...colSpan} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        style={{ width: "100%" }}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onSubmit"
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
