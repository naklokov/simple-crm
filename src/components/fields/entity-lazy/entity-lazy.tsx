import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Form, Col, Select, Spin } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LabeledValue } from "antd/lib/select";
import { DEFAULT_FIELD_SPAN, FieldProps, State } from "../../../constants";
import {
  callAfterDelay,
  defaultErrorHandler,
  fillLinks,
  FormContext,
  useFormValues,
  useValidationService,
} from "../../../utils";
import { Loading } from "../loading";
import {
  getFetchParams,
  getInitialFetchParams,
  getMappedOptions,
  isScrollBottom,
} from "./utils";
import { HighlightTextWrapper } from "../../../wrappers";
import { Readonly } from "../readonly";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../../table/constants";

export const EntityLazy = ({
  fieldCode,
  rules,
  fieldName,
  titleField = "value",
  codeField = "valueCode",
  fieldDescription,
  placeholder = "Выберите значение",
  disabled = false,
  _links = {},
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
  pageSize = DEFAULT_PAGE_SIZE,
}: FieldProps) => {
  const [t] = useTranslation("fields");
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searched, setSearched] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);

  const { form, name } = useContext(FormContext);
  const [formValues] = useFormValues(name ?? "");
  const { wrappedRules } = useValidationService(
    rules,
    _links?.validation?.href ?? "",
    formValues
  );

  const style = { width: "100%" };

  const fieldValue = form?.getFieldValue(fieldCode);
  const profileInfo = useSelector((state: State) => state.persist.profileInfo);
  const filledLinks = useMemo(
    () =>
      fillLinks(_links, {
        userProfileId: profileInfo?.id ?? "",
      }),
    [_links, profileInfo?.id]
  );

  /**
   * Инициализация опций для начального значения
   */
  useEffect(() => {
    const fetchInitial = async (value: string) => {
      setLoading(true);
      const { url, params, query } = getInitialFetchParams(
        value,
        codeField,
        filledLinks
      );

      try {
        const { data } = await axios.get(url, {
          params: {
            ...params,
            query,
            pageSize: DEFAULT_PAGE_SIZE,
            page: DEFAULT_PAGE_NUMBER,
          },
        });

        const initialOptions = getMappedOptions(
          data?.rows,
          titleField,
          codeField
        );

        setTotalCount(data?.totalCount);
        setOptions(initialOptions);
      } catch (error) {
        defaultErrorHandler({
          error,
        });
      } finally {
        setLoading(false);
        setInitial(false);
      }
    };

    if (fieldValue && initial) {
      fetchInitial(fieldValue);
    } else {
      setInitial(false);
    }
  }, [codeField, fieldCode, filledLinks, titleField, fieldValue, initial]);

  /**
   * Запрос к серверу с пагинацией
   */
  useEffect(() => {
    const fetchLazyOptions = async () => {
      setLoading(true);
      const { url, params, query } = getFetchParams(
        searched,
        titleField,
        filledLinks
      );

      try {
        const { data } = await axios.get(url, {
          params: { ...params, query, pageSize, page },
        });

        const mappedOptions = getMappedOptions(
          data?.rows,
          titleField,
          codeField
        );

        setTotalCount(data?.totalCount);
        setOptions((prevOptions) => [...prevOptions, ...mappedOptions]);
      } catch (error) {
        defaultErrorHandler({
          error,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLazyOptions();
  }, [codeField, page, pageSize, searched, filledLinks, titleField]);

  /**
   * Слежение за прокруткой списка
   */
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const needLoadMore = !loading && hasMore && isScrollBottom(event);

      if (needLoadMore) {
        if (options.length >= totalCount) {
          setLoading(false);
          setHasMore(false);
          return;
        }

        setPage(page + 1);
      }
    },
    [loading, hasMore, options.length, page, totalCount]
  );

  /**
   * Поиск по списку
   */
  const handleSearch = useCallback(async (value) => {
    const callback = () => {
      setSearched(value);
      setHasMore(true);
      setOptions([]);
      setPage(1);
    };

    callAfterDelay(callback, 300);
  }, []);

  const handleSelect = useCallback(() => {
    setSearched("");
  }, []);

  const notFoundContent = useMemo(
    () =>
      loading ? (
        <Spin size="small" />
      ) : (
        <span>{t("entity.not.found.description")}</span>
      ),
    [loading, t]
  );

  const formatFunc = (value: string) =>
    (options?.find((o) => o.value === value)?.label as string) ?? "";

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
        rules={wrappedRules}
        validateTrigger="onBlur"
      >
        {readonly ? (
          <Readonly format={formatFunc} />
        ) : (
          <Select
            loading={loading}
            placeholder={placeholder}
            onPopupScroll={handleScroll}
            onSearch={handleSearch}
            onSelect={handleSelect}
            defaultActiveFirstOption={false}
            filterOption={false}
            disabled={disabled}
            notFoundContent={notFoundContent}
            allowClear
            showSearch
          >
            {options?.map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                <HighlightTextWrapper
                  searched={[searched]}
                  text={label as string}
                />
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Col>
  );
};
