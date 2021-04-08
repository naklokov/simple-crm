import { useState, useEffect, useCallback, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";
import { History } from "history";
import { defaultErrorHandler } from "./common";
import {
  UseFormProps,
  State,
  urls,
  ClientEntityProps,
  ProfileInfoEntityProps,
  TabProps,
  TabPositionType,
} from "../constants";
import { updateForm } from "../__data__";
import { getRsqlParams } from "./rsql";

type MethodType = "get" | "post" | "put" | "delete";

interface FetchProps {
  url: string;
  method?: MethodType;
  data?: object;
  params?: object;
}

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

export const useFetch = ({
  url,
  method = "get",
  data = {},
  params = {},
}: FetchProps) => {
  const [response, setResponse] = useState<AxiosResponse<any>>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(uuidV4());

  const reload = () => {
    setReloadKey(uuidV4());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({ method, params, data, url });
        setResponse(res);
      } catch (err) {
        setError(error);
        defaultErrorHandler({ error: err });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reloadKey]);

  return { response, loading, error, reload };
};

export function useFormValues<T>(formName: string): UseFormProps<T> {
  const dispatch = useDispatch();
  const values = useSelector(
    (state: State) => state?.app?.forms?.[formName] ?? ({} as T)
  );

  const clear = () => {
    dispatch(updateForm({ name: formName, data: {} }));
  };

  const update = (data: any) => {
    dispatch(updateForm({ name: formName, data }));
  };

  return { values, update, clear };
}

export const useFetchPersonalClients = () => {
  const [clients, setClients] = useState<ClientEntityProps[]>([]);
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as ProfileInfoEntityProps)
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
    if (profileInfo.id) {
      const query = getRsqlParams([
        { key: "userProfileId", value: profileInfo.id },
      ]);
      fetchClients(query);
    }
  }, [profileInfo]);

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
