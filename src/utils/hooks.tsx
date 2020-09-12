import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { defaultErrorHandler } from "./common";

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
