import { useState, useEffect, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
import { defaultErrorHandler } from "./common";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../__data__/interfaces";
import { updateForm } from "../__data__";

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

export const useFormValues = (formName: string) => {
  const dispatch = useDispatch();
  const values = useSelector(
    (state: State) => state?.app?.forms?.[formName] ?? {}
  );

  const clear = () => {
    dispatch(updateForm({ name: formName, data: {} }));
  };

  const update = (data: any) => {
    dispatch(updateForm({ name: formName, data }));
  };

  return { values, update, clear };
};
