import React, { useCallback, useEffect, useState } from "react";
import { Form, Col, Select } from "antd";
import axios from "axios";

import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { defaultErrorHandler, getRsqlParams, getSearchRsql, mergeInitialParams } from "../../../utils";
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
                             _links,
                             readonly = false,
                             span = DEFAULT_FIELD_SPAN,
                             pageSize = 10,
                           }: FieldProps) => {

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searched, setSearched] = useState("");
  const [count, setCount] = useState(0);
  const [url, query] = _links?.self?.href?.split("?") ?? [];
  const style = { width: "100%" };

  const fetchItems = useCallback(async (queryParams: string | null = null) => {
    try {
      setLoading(true);

      const params = mergeInitialParams(queryParams ?? "", query);
      const response = await axios.get(url,
        { params: { pageSize: options.length + pageSize, sortBy: `${titleField}:asc`, ...params } });

      setCount(response?.data?.totalCount ?? 0);
      const mappedOptions = response?.data?.rows?.map((obj: any) => {
        const { [titleField]: label, [codeField]: value } = obj;
        return { label, value };
      }) ?? [];

      setOptions(mappedOptions);

    } catch (error) {
      defaultErrorHandler({
        error,
      });
    } finally {
      setLoading(false);
    }
  }, [codeField, options, pageSize, query, titleField, url]);


  useEffect(() => {
    fetchItems();
  }, [codeField, fieldCode]);

  const handleLoadMore = useCallback(async () => {

    if (options.length >= count) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    await fetchItems(
      searched
        ? getRsqlParams([getSearchRsql([titleField], searched)])
        : null,
    );
  }, [searched, count, options]);

  const handleScroll = useCallback(async (event: any) => {
    console.log("hasMore", hasMore);
    if (
      !loading && hasMore &&
      event.target.scrollTop + event.target.offsetHeight >=
      event.target.scrollHeight / 1.5
    ) {
      await handleLoadMore();
    }

  }, [loading, hasMore]);

  const handleSearch = useCallback(
    async (value) => {
      setSearched(value);
      setHasMore(true);
      setLoading(true);
      setOptions([]);
      if (value) {
        await fetchItems(getRsqlParams([getSearchRsql([titleField], value)]));
      }else{
        await fetchItems();
      }
    }
    ,
    [titleField],
  );

  const formatFunc = (value: string) =>
    options?.find((o) => o.value === value)?.label ?? "";

  return <Col {...span} key={fieldCode}>
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
      ) :( <Select
          loading={loading}
          placeholder={placeholder}
          onPopupScroll={handleScroll}
          onSearch={handleSearch}
          autoClearSearchValue={false}
          defaultActiveFirstOption={false}
          filterOption={false}
          allowClear
          showSearch
        >

          {
            options?.map(({ value, label }) =>
              <Select.Option key={value} value={value}>
                <HighlightTextWrapper searched={[searched]} text={label} />
              </Select.Option>)
          }

        </Select>
        )}
    </Form.Item>

  </Col>;

};