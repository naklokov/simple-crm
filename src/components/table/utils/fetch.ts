import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultErrorHandler } from "../../../utils";
import { setDictionaries, setTableLoading } from "../../../__data__";

export const fetchDictionary = async (
  url: string,
  dictionaryName: string,
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get(url);
    dispatch(
      setDictionaries({ name: dictionaryName, data: response?.data ?? [] })
    );
  } catch (error) {
    defaultErrorHandler({ error });
  }
};
