import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Col, Select, Spin } from "antd";
import axios from "axios";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LabeledValue } from "antd/lib/select";
import { DEFAULT_FIELD_SPAN, FieldProps, State } from "../../../constants";
import { defaultErrorHandler, fillLinks } from "../../../utils";
import { getFetchParams, getMappedOptions, isScrollBottom } from "./utils";
import { HighlightTextWrapper } from "../../../wrappers";
import { Readonly } from "../readonly";
import { DEFAULT_PAGE_SIZE } from "../../table/constants";

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
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searched, setSearched] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const profileInfo = useSelector((state: State) => state.persist.profileInfo);
  const filledLinks = useMemo(
    () =>
      fillLinks(_links, {
        userProfileId: profileInfo?.id ?? "",
      }),
    [_links, profileInfo?.id]
  );

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
    setSearched(value);
    setHasMore(true);
    setOptions([]);
    setPage(1);
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
          <Readonly format={formatFunc} />
        ) : (
          <Select
            loading={loading}
            placeholder={placeholder}
            onPopupScroll={handleScroll}
            onSearch={handleSearch}
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
