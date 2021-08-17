import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Key,
  useContext,
} from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";
import { History } from "history";
import {
  Button,
  Col,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { TableRowSelection } from "antd/lib/table/interface";
import {
  DeleteOutlined,
  LinkOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { toNumber } from "lodash";
import { defaultErrorHandler, fillLinks, pluralize } from "./common";
import {
  State,
  urls,
  ClientEntityProps,
  TabProps,
  TabPositionType,
  MethodType,
  TIME_ZONE_COLOR,
  PROCESSING_STATUS,
  DictionaryProps,
  axiosCacheLong,
  axiosCacheShort,
  ValidationIconProps,
  validationIcons,
} from "../constants";
import { updateForm } from "../__data__";
import { getRsqlParams } from "./rsql";
import { ValidationIcon } from "../components";
import { FormContext } from "./context";

interface FetchProps {
  url: string;
  method?: MethodType;
  data?: object;
  params?: object;
  initial?: any;
  cache?: boolean;
  cacheMaxAge?: "short" | "long";
}

type FetchResponseType<T> = [T, boolean, () => void, any];

const TAB_QUERY_NAME = "tab";

const getActiveTabName = (position?: TabPositionType) =>
  position ? `${position}:${TAB_QUERY_NAME}` : TAB_QUERY_NAME;

const getActiveQueryTab = (tabs: TabProps[]) => {
  const queries = parse(window.location.search);
  const values = Object.values(queries);
  return tabs.find(({ tabCode }) => values.includes(tabCode)) || tabs[0];
};

const filterQueriesByTab = (queries: {
  [key: string]: string | string[] | null;
}) =>
  Object.keys(queries)
    .filter((queryKey) => queryKey.includes(TAB_QUERY_NAME))
    .reduce(
      (acc, queryKey) => ({
        ...acc,
        [queryKey]: queries[queryKey],
      }),
      {}
    );

const setActiveQueryTab = (
  value: string,
  key: string,
  history: History,
  method: "replace" | "push"
) => {
  const changeHistoryMethod = history?.[method];
  const queries = parse(history.location.search);
  // отфильтрованные параметры из search url, которые содержат /tab/ в ключе
  const tabsQueries = filterQueriesByTab(queries);

  changeHistoryMethod({
    search: stringify({
      ...tabsQueries,
      [key]: value,
    }),
  });
};

export function useFetch<T>({
  url,
  method = "get",
  data = {},
  params = {},
  initial = [],
  cache = false,
  cacheMaxAge = "long",
}: FetchProps): FetchResponseType<T> {
  const [responseData, setResponseData] = useState<T>(initial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(uuidV4());

  const reload = useCallback(() => {
    setReloadKey(uuidV4());
  }, []);

  const axiosMethod = useMemo(
    () => (cacheMaxAge === "long" ? axiosCacheLong : axiosCacheShort),
    [cacheMaxAge]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axiosMethod?.({
          method,
          cache,
          params,
          data,
          url,
        });
        setResponseData(res?.data);
      } catch (err) {
        setError(err);
        defaultErrorHandler({ error: err });
      } finally {
        setLoading(false);
      }
    };

    if (axiosMethod) {
      fetchData();
    }
  }, [reloadKey, url, method, cache, axiosMethod]);

  return [responseData, loading, reload, error];
}

type FormValuesReturn<T> = [T, (values?: T) => void];

export function useFormValues<T>(name: string): FormValuesReturn<T> {
  const dispatch = useDispatch();
  const values = useSelector(
    (state: State) => state?.form?.forms?.[name] ?? ({} as T)
  );

  const update = useCallback(
    (data: T = {} as T) => {
      dispatch(updateForm({ name, values: data }));
    },
    [name, dispatch]
  );

  return [values, update];
}

export const useFetchPersonalClients = () => {
  const [clients, setClients] = useState<ClientEntityProps[]>([]);
  const profileInfoId = useSelector(
    (state: State) => state?.persist?.profileInfo?.id
  );

  const fetchClients = async (query: string) => {
    try {
      const url = urls.clients.entity;
      const response = await axios.get(url, {
        params: { query },
      });
      setClients(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error });
    }
  };

  useEffect(() => {
    if (profileInfoId) {
      const query = getRsqlParams([
        { key: "userProfileId", value: profileInfoId },
      ]);
      fetchClients(query);
    }
  }, [profileInfoId]);

  return clients;
};

export const useTabs = (
  tabs: TabProps[],
  method: "replace" | "push" = "push",
  position?: TabPositionType
) => {
  const defaultTab = getActiveQueryTab(tabs);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const queryTabCode = useMemo(() => getActiveTabName(position), [position]);

  // берём активную вкладку из searchParams url
  useEffect(() => {
    const { [queryTabCode]: key = "" } = parse(history.location.search);
    const tab = tabs.find(({ tabCode }) => tabCode === key);
    setActiveTab(tab || defaultTab);
  }, [history.location.search, defaultTab, queryTabCode, tabs]);

  // при изменении записываем в searchParams новое значение вкладки
  const onChange = useCallback(
    (key: string) => {
      setActiveQueryTab(key, queryTabCode, history, method);
    },
    [history, queryTabCode, method]
  );

  return { activeTab, onChange };
};

interface UseSelectableFooterProps {
  dataSource: { value: string; title: string }[];
  onSubmit: (selectedKeys: Key[], selectedTarget: string) => void;
  placeholder?: string;
  buttonTitle?: string;
  onDelete?: (selectedKeys: Key[]) => void;
}

export const useSelectableFooter = ({
  dataSource,
  placeholder,
  buttonTitle,
  onSubmit,
  onDelete,
}: UseSelectableFooterProps) => {
  const [t] = useTranslation("selectableFooter");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string>();

  const handleSelectChange = useCallback((value) => {
    setSelectedTarget(value);
  }, []);

  const handleChangeSelectTable = useCallback((selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  }, []);

  const handleResetTableSelection = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedTarget(undefined);
  }, []);

  const handleClickFinish = useCallback(() => {
    onSubmit?.(selectedRowKeys, selectedTarget || "");
    handleResetTableSelection();
  }, [onSubmit, selectedRowKeys, selectedTarget, handleResetTableSelection]);

  const handleDelete = useCallback(() => {
    onDelete?.(selectedRowKeys);
  }, [onDelete, selectedRowKeys]);

  const handleFilterOption = useCallback(
    (input, option) =>
      option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0,
    []
  );

  const rowSelection: TableRowSelection<any> = useMemo(
    () => ({
      onChange: handleChangeSelectTable,
      selectedRowKeys,
      preserveSelectedRowKeys: true,
    }),
    [selectedRowKeys, handleChangeSelectTable]
  );

  const selectedCount = selectedRowKeys?.length ?? 0;

  if (!selectedCount) {
    return { rowSelection, footer: undefined };
  }

  const total = pluralize(selectedCount, [
    t("selected.one", { count: selectedCount }),
    t("selected.some", { count: selectedCount }),
    t("selected.many", { count: selectedCount }),
  ]);

  const footer = (
    <Row justify="space-between">
      <Col flex="auto">
        <Space size="middle">
          <Select
            value={selectedTarget}
            placeholder={placeholder || t("select.placeholder")}
            onChange={handleSelectChange}
            filterOption={handleFilterOption}
            optionFilterProp="children"
            style={{ width: 250 }}
            showSearch
          >
            {dataSource.map(({ value, title }) => (
              <Select.Option key={value} value={value}>
                {title}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            disabled={!selectedTarget}
            onClick={handleClickFinish}
          >
            {buttonTitle || t("button.submit")}
          </Button>
        </Space>
      </Col>
      <Col>
        <Space size="middle">
          <Typography.Text>{total}</Typography.Text>
          <Button onClick={handleResetTableSelection}>
            {t("button.reset")}
          </Button>
          {onDelete && (
            <Button icon={<DeleteOutlined />} onClick={handleDelete}>
              {t("button.delete")}
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  );

  return { rowSelection, footer };
};

export const useClientTimeZone = (tz: string) => {
  const [t] = useTranslation("clientTimeZone");

  const [{ values: options }, loadingDictionary] = useFetch<DictionaryProps>({
    url: urls.dictionaries.clientTimeZone,
    initial: {},
    cache: true,
  });

  const option = useMemo(() => options?.find((o: any) => o.valueCode === tz), [
    options,
    tz,
  ]);

  const icon = useMemo(
    () => (loadingDictionary ? <SyncOutlined spin /> : undefined),
    [loadingDictionary]
  );

  const color = useMemo(() => {
    const key = option?.value ?? PROCESSING_STATUS;
    return TIME_ZONE_COLOR[key];
  }, [option?.value]);

  const getPluralizedTitle = (value: string) => {
    const hour = toNumber(value);

    return pluralize(hour, [
      t("tooltip.title.one", { value }),
      t("tooltip.title.some", { value }),
      t("tooltip.title.many", { value }),
    ]);
  };

  const tzTag = option?.value ? (
    <Tooltip title={getPluralizedTitle(option?.value)}>
      <Tag icon={icon} color={color}>
        {option?.value}
      </Tag>
    </Tooltip>
  ) : (
    <span />
  );

  return { tzTag };
};

export const useRedirectLink = (link: string) => {
  const [hover, setHover] = useState(false);
  const history = useHistory();

  const toggleHover = useCallback(() => {
    setHover(!hover);
  }, [hover]);

  const redirect = useCallback(() => {
    history.push(link ?? "");
  }, [history, link]);

  const redirectIcon =
    link && hover ? (
      <LinkOutlined
        onClick={redirect}
        style={{ cursor: "pointer", color: "black" }}
      />
    ) : null;

  return {
    toggleHover,
    redirect,
    redirectIcon,
  };
};

export const useValidationService = (
  validationLink: string,
  fieldCode: string
) => {
  const [result, setResult] = useState<ValidationIconProps>({});
  const { form, name } = useContext(FormContext);
  const [values] = useFormValues(name ?? "");
  const [value, setValue] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      let validationData: ValidationIconProps = {};
      try {
        if (value && validationLink) {
          setResult({});
          setLoading(true);
          const {
            data: [message],
          } = await axios.post(validationLink, {
            fieldCode,
            fieldValue: value,
            otherFieldValues: values,
          });

          validationData =
            {
              ...message,
              messageType: message.messageType.toLowerCase(),
            } ?? {};
        }
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setResult(validationData);
        setLoading(false);
      }
    };

    fetch();
  }, [value]);

  const validationCallback = useCallback(() => {
    setValue(form?.getFieldValue(fieldCode));
  }, [form, fieldCode]);

  const isLoading = loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
  ) : null;

  const validationIcon = result?.messageType ? (
    <ValidationIcon {...result} />
  ) : (
    isLoading
  );

  const validationStyle =
    !isLoading && result?.messageType
      ? { borderColor: validationIcons.get(result.messageType).color }
      : {};

  return {
    validationCallback,
    validationIcon,
    validationStyle,
  };
};
