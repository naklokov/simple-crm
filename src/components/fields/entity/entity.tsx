import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import axios from "axios";
import { Col, Form, Select, Spin } from "antd";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_FIELD_SPAN,
  FieldProps,
  RSQL_DELIMETER,
} from "../../../constants";
import {
  defaultErrorHandler,
  FormContext,
  getRsqlParams,
  getEqualRsql,
  getSearchRsql,
  getInitialParams,
} from "../../../utils";
import { Readonly } from "../readonly";
import { Loading } from "../loading";
import { HighlightTextWrapper } from "../../../wrappers";

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
  let delayTimer: NodeJS.Timeout;

  const { form } = useContext(FormContext) ?? {};
  const [t] = useTranslation("entity");
  const [initial, setInitial] = useState(false);
  const [searched, setSearched] = useState("");
  const [options, setOptions] = useState<{ label: string; value: string }[]>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, initialSearch] = _links?.self?.href?.split("?") ?? [];

  const callAfterDelay = useCallback((callback: Function, delay: number) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      callback?.();
    }, delay);
  }, []);

  const fetchEntities = useCallback(
    async (query: string) => {
      setLoading(true);
      const { initialQueries, initialSearchParams } = getInitialParams(
        initialSearch
      );
      try {
        const response = await axios.get(url, {
          params: {
            query: [query, ...initialQueries].join(RSQL_DELIMETER),
            ...initialSearchParams,
          },
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
        setLoading(false);
        setInitial(false);
      }
    },
    [url, codeField, titleField, initialSearch]
  );

  // запрос значения при инициализации
  useEffect(() => {
    const fieldValue = form?.getFieldValue(fieldCode);

    if (fieldValue) {
      setInitial(true);
      const query = getRsqlParams([getEqualRsql(codeField, fieldValue)]);
      fetchEntities(query);
    }
  }, [codeField, fetchEntities, fieldCode]);

  const handleFocus = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSearch = useCallback(
    (value) => {
      if (value) {
        setOpen(!!value);
        setSearched(value);
        setOptions([]);
        setLoading(true);

        const callback = () => {
          const query = getRsqlParams([getSearchRsql([titleField], value)]);
          fetchEntities(query);
        };

        callAfterDelay(callback, 300);
      } else {
        setOpen(false);
      }
    },
    [callAfterDelay, fetchEntities, titleField]
  );

  const formatFunc = (value: string) =>
    options?.find((o) => o.value === value)?.label ?? "";

  const notFoundContent = useMemo(
    () =>
      loading ? (
        <Spin size="small" />
      ) : (
        <span>{t("not.found.description")}</span>
      ),
    [loading, t]
  );

  const style = { width: "100%" };

  if (initial) {
    return (
      <Loading
        style={style}
        label={fieldName}
        extra={fieldDescription}
        name={fieldCode}
        span={span}
      />
    );
  }

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        name={fieldCode}
        label={fieldName}
        style={style}
        extra={fieldDescription}
        rules={rules}
        validateTrigger="onBlur"
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <Select
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            placeholder={placeholder}
            style={{ width: "100%" }}
            loading={loading}
            disabled={disabled}
            open={open}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSelect={handleSelect}
            notFoundContent={notFoundContent}
            showArrow={false}
            showSearch
          >
            {options?.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                <HighlightTextWrapper searched={[searched]} text={label} />
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Col>
  );
};

export default Entity;
