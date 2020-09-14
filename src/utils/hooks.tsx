import { useState, useEffect, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
import { defaultErrorHandler } from "./common";
import { Dispatch } from "@reduxjs/toolkit";

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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({ method, params, data, url });
        setResponse(res);
      } catch (error) {
        setError(error);
        defaultErrorHandler({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { response, loading, error };
};

export const useQuery = (
  name: string,
  initial: string = ""
): [string, (item: string) => void] => {
  const searchParams = new URLSearchParams(window.location.search);
  let initialState = "";
  debugger;
  if (!searchParams.has(name)) {
    searchParams.append(name, initial);
    initialState = initial;
  } else {
    initialState = searchParams.get(name) || "";
  }
  const [value, setValue] = useState(initialState || "");

  const setQueryValue = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(name, value);
    setValue(value);
  };

  return [value, setQueryValue];
};
