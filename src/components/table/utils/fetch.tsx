import axios from "axios";
import { defaultErrorHandler, defaultSuccessHandler } from "../../../utils";

export const fetchTotalCount = async (
  url: string,
  setLoadingCallback: Function,
  setResultCallback: Function
) => {
  try {
    setLoadingCallback(true);
    const responce = await axios.get(url, { params: { tableMeta: true } });
    const { totalCount } = responce?.data ?? {};
    setResultCallback(totalCount);
  } catch (error) {
    defaultErrorHandler({ error });
  } finally {
    setLoadingCallback(false);
  }
};

export const fetchData = async (
  url: string,
  params: { [key: string]: string | number | boolean },
  setLoadingCallback: Function,
  setResultCallback: Function
) => {
  try {
    setLoadingCallback(true);
    const response = await axios.get(url, { params });
    setResultCallback(response?.data ?? []);
  } catch (error) {
    defaultErrorHandler({ error });
  } finally {
    setLoadingCallback(false);
  }
};
