import React, { useCallback, useEffect, useState } from "react";
import { Form, Col, Select } from "antd";
import axios from "axios";

import { useSelector } from "react-redux";
import { DEFAULT_FIELD_SPAN, FieldProps, State } from "../../../constants";
import {
  defaultErrorHandler,
  fillLinks,
  getRsqlParams,
  getSearchRsql,
  getConcatenationQueryRsql,
  getInitialParams,
} from "../../../utils";
import { HighlightTextWrapper } from "../../../wrappers";
import { Readonly } from "../readonly";

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
  pageSize = 10,
}: FieldProps) => {
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);
  const [searched, setSearched] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const profileInfo = useSelector((state: State) => state.persist.profileInfo);
  const filledLinks = fillLinks(_links, {
    userProfileId: profileInfo?.id ?? "",
  });
  const [url, query] = filledLinks?.self?.href?.split("?") ?? [];

  const style = { width: "100%" };

  /**
   * Постраничное получение списка
   * @param queryParams Параметры rsql запроса
   */
  const fetchItems = useCallback(
    async (queryParams: string | null = null) => {
      try {
        setLoading(true);
        const { initialQueries, initialSearchParams } = getInitialParams(query);
        const params = getConcatenationQueryRsql(
          queryParams ?? "",
          initialQueries
        );
        const response = await axios.get(url, {
          params: {
            page,
            pageSize,
            sortBy: `${titleField}:asc`,
            query: params,
            ...initialSearchParams,
          },
        });
        setPage(page + 1);
        setTotalCount(response?.data?.totalCount ?? 0);
        setTotalPage(Math.ceil(totalCount / pageSize));
        const mappedOptions =
          response?.data?.rows?.map((obj: any) => {
            const { [titleField]: label, [codeField]: value } = obj;
            return { label, value };
          }) ?? [];

        setOptions([...options, ...mappedOptions]);
      } catch (error) {
        defaultErrorHandler({
          error,
        });
      } finally {
        setLoading(false);
      }
    },
    [page, totalCount, codeField, options, pageSize, query, titleField, url]
  );

  /**
   * Инициализация
   */
  useEffect(() => {
    fetchItems();
  }, [codeField, fieldCode]);

  /**
   * Подгрузка списка
   */
  const handleLoadMore = useCallback(async () => {
    if (page >= totalPage && options.length >= totalCount) {
      setLoading(false);
      setHasMore(false);
      return;
    }
    await fetchItems(
      searched ? getRsqlParams([getSearchRsql([titleField], searched)]) : null
    );
  }, [page, totalPage, searched, totalCount, options, titleField]);

  /**
   * Слежение за прокруткой списка
   */
  const handleScroll = useCallback(
    async (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (
        !loading &&
        hasMore &&
        event?.currentTarget?.scrollTop + event?.currentTarget?.offsetHeight >=
          event?.currentTarget?.scrollHeight - 150
      ) {
        await handleLoadMore();
      }
    },
    [loading, hasMore]
  );

  /**
   * Поиск по списку
   */
  const handleSearch = useCallback(
    async (value) => {
      setSearched(value);
      setHasMore(true);
      setLoading(true);
      setOptions([]);
      setPage(1);

      await fetchItems(
        value ? getRsqlParams([getSearchRsql([titleField], value)]) : null
      );
    },
    [titleField]
  );

  const formatFunc = (value: string) =>
    options?.find((o) => o.value === value)?.label ?? "";

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
            loading={loading}
            placeholder={placeholder}
            onPopupScroll={handleScroll}
            onSearch={handleSearch}
            autoClearSearchValue={false}
            defaultActiveFirstOption={false}
            filterOption={false}
            disabled={disabled}
            allowClear
            showSearch
          >
            {options?.map(({ value, label }) => (
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
