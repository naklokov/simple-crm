import React, { useState, useEffect, useCallback } from "react";
import { Col, Form, Select, Spin } from "antd";
import { Dispatch } from "@reduxjs/toolkit";
import { DEFAULT_SPAN, FieldProps, urls } from "../../../constants";
import { getRsqlQuery, useFetch } from "../../../utils";
import { setLoading } from "../../../__data__";
import { connect } from "react-redux";
import { ProfileInfoProps, State } from "../../../__data__/interfaces";

const { Option } = Select;

interface DictionaryComponentProps extends FieldProps {
  setLoading: (loading: boolean) => void;
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
  const url = _links?.self.href ?? "";
  const params = getRsqlQuery([
    { key: "userProfileId", value: profileInfo.id || "" },
  ]);

  const { response, loading } = useFetch({ url, params });

  useEffect(() => {
    if (response) {
      setOptions(response?.data);
    }
  }, [response]);

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
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
