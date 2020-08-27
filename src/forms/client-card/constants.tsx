import { Main, Comments } from "./tabs";
import React from "react";
import { FieldProps } from "../../constants";

export const TABS_MAP: {
  [key: string]: any;
} = {
  main: Main,
  comments: Comments,
};
