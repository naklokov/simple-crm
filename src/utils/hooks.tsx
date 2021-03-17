import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { defaultErrorHandler } from "./common";
import {
  UseFormProps,
  State,
  urls,
  ClientEntityProps,
  ProfileInfoEntityProps,
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
