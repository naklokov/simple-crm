import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { defaultErrorHandler } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { EntityOwnerProps, State } from "../constants";
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

interface FormReturnProps {
  values: EntityOwnerProps;
  update: (data: EntityOwnerProps) => void;
  clear: () => void;
}

export const useFormValues = (formName: string): FormReturnProps => {
  const dispatch = useDispatch();
  const values = useSelector(
    (state: State) => state?.app?.forms?.[formName] ?? ({} as EntityOwnerProps)
  );

  const clear = () => {
    dispatch(updateForm({ name: formName, data: {} }));
  };

  const update = (data: any) => {
    dispatch(updateForm({ name: formName, data }));
  };

  return { values, update, clear };
};
