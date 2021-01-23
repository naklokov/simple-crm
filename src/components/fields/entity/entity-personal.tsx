import React, { useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import {
  DEFAULT_FIELD_SPAN,
  FieldProps,
  ProfileInfoProps,
  State,
} from "../../../constants";
import {
  defaultErrorHandler,
  FormContext,
  getRsqlParams,
} from "../../../utils";
import { connect } from "react-redux";
import { getEqualRsql, getLikeRsql } from "../../table/utils";
import { Readonly } from "../readonly";

const { Option } = Select;

interface DictionaryComponentProps extends FieldProps {
  profileInfo: ProfileInfoProps;
}

// TODO костыль до первого запроса (первый запрос)
export const Entity = ({
  fieldCode,
  rules,
  fieldName,
  titleField = "value",
  codeField = "valueCode",
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  readonly = false,
  _links,
  span = DEFAULT_FIELD_SPAN,
  profileInfo,
}: DictionaryComponentProps) => {
  const form = useContext(FormContext);
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialValue = form.getFieldValue(fieldCode);
    const initialQuery = getRsqlParams([
      { key: "userProfileId", value: profileInfo.id },
      getEqualRsql(codeField, initialValue),
    ]);
    fetchEntity(initialQuery);
  }, [profileInfo]);

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
      if (profileInfo.id) {
        const searchedQuery = getRsqlParams([
          { key: "userProfileId", value: profileInfo.id },
          getLikeRsql([titleField], value),
        ]);
        fetchEntity(searchedQuery);
      }
    },
    [titleField, profileInfo]
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
        )}
      </Form.Item>
    </Col>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Entity);
