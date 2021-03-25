import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultErrorHandler } from "../../../utils";
import { setDictionaries } from "../../../__data__";

export const fetchDictionary = async (
  url: string,
  dictionaryName: string,
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get(url);
    const dictionary = { [dictionaryName]: response?.data ?? [] };
    dispatch(setDictionaries(dictionary));
  } catch (error) {
    defaultErrorHandler({ error });
  }
};
